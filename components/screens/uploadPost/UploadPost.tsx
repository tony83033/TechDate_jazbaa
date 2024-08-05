import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image, Dimensions } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

interface FormValues {
  title: string;
  desc: string;
  image: string;
}

interface FormScreenProps {
  uploadPost: (values: FormValues) => void;
}
const validationSchema = Yup.object().shape({
  title: Yup.string()
    .max(100, 'Title must not be longer than 100 characters')
    .required('Title is required'),
  desc: Yup.string()
    .max(300, 'Description must not be longer than 300 characters')
    .required('Description is required'),
  image: Yup.string().required('Image is required'),
});

const FormScreen: React.FC<FormScreenProps> = ({ uploadPost }) => {
  const [imageUrl, setImageUrl] = useState<string>('');

  const pickImage = async (setFieldValue: (field: string, value: any) => void) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setFieldValue('image', result.assets[0].uri);
      setImageUrl(result.assets[0].uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient colors={['#e6e6fa', '#FFFFFF']} style={styles.gradient}>
        <Text style={styles.header}>Create Post</Text>
        <Formik
          initialValues={{ title: '', desc: '', image: '' }}
          validationSchema={validationSchema}
          onSubmit={(values: FormValues) => {
            uploadPost({ title: values.title, desc: values.desc, imageurl: values.image });
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Ionicons name="pencil" size={24} color="#4834DF" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('title')}
                  onBlur={handleBlur('title')}
                  value={values.title}
                  placeholder="Enter title"
                  placeholderTextColor="#999"
                />
              </View>
              {touched.title && errors.title && <Text style={styles.error}>{errors.title}</Text>}

              <View style={styles.inputContainer}>
                <Ionicons name="document-text" size={24} color="#4834DF" style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, styles.textArea]}
                  onChangeText={handleChange('desc')}
                  onBlur={handleBlur('desc')}
                  value={values.desc}
                  placeholder="Enter description"
                  placeholderTextColor="#999"
                  multiline
                />
              </View>
              {touched.desc && errors.desc && <Text style={styles.error}>{errors.desc}</Text>}

              <TouchableOpacity onPress={() => pickImage(setFieldValue)} style={styles.imagePicker}>
                <Ionicons name="image" size={24} color="#FFFFFF" />
                <Text style={styles.imagePickerText}>Pick an image</Text>
              </TouchableOpacity>
              {values.image ? (
                <Image source={{ uri: values.image }} style={styles.imagePreview} />
              ) : null}
              {touched.image && errors.image && <Text style={styles.error}>{errors.image}</Text>}

              <TouchableOpacity onPress={() => handleSubmit()} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#e6e6fa',
  },
  gradient: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    minHeight: Dimensions.get("window").height,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4834DF',
    marginBottom: 20,
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6fa',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 10,
  },
  textArea: {
    minHeight: 100,
  },
  error: {
    fontSize: 12,
    color: '#FF6B6B',
    marginBottom: 10,
  },
  imagePicker: {
    backgroundColor: '#4834DF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  imagePickerText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 10,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: '#4834DF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FormScreen;

