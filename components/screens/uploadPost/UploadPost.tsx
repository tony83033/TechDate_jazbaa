import React from 'react';
import { View, Text, TextInput, Button, Dimensions ,StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as ImagePicker from 'expo-image-picker';

interface FormValues {
  title: string;
  desc: string;
  image: string;
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

const FormScreen = ({uploadPost}:any) => {
  const [imageUrl, setImageUrl] = React.useState<string>('');
  const pickImage = async (setFieldValue:any) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result.assets[0].uri);
      setFieldValue('image',(result.assets[0].uri).toString());
      setImageUrl(result.assets[0].uri);
        }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Formik
        initialValues={{ title: '', desc: '', image: '' }}
        validationSchema={validationSchema}
        onSubmit={(values: FormValues) => {
          uploadPost({ title: values.title, desc: values.desc, imageurl: values.image });
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
          <View style={styles.formContainer}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              value={values.title}
              placeholder="Enter title"
            />
            {touched.title && errors.title && <Text style={styles.error}>{errors.title}</Text>}

            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('desc')}
              onBlur={handleBlur('desc')}
              value={values.desc}
              placeholder="Enter description"
              multiline
            />
            {touched.desc && errors.desc && <Text style={styles.error}>{errors.desc}</Text>}

            <Text style={styles.label}>Image</Text>
            <TouchableOpacity onPress={() => pickImage(setFieldValue)} style={styles.imagePicker}>
              <Text style={styles.imagePickerText}>Pick an image</Text>
            </TouchableOpacity>
            {values.image ? <Image source={{ uri: values.image }} style={styles.imagePreview} /> : null}
            {touched.image && errors.image && <Text style={styles.error}>{errors.image}</Text>}
            <View style={styles.buttonStyle}>
            <Button onPress={()=>handleSubmit()} title="Submit" />
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#e6e6fa',
    padding: 20,
    justifyContent: 'center',
    height:Dimensions.get("window").height
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  desct: {
    backgroundColor: '#f8f8f8',
    padding: 12,
    paddingBottom: 500,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  error: {
    fontSize: 12,
    color: 'red',
    marginBottom: 10,
  },
  imagePicker: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  imagePickerText: {
    color: '#000',
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonStyle:{
    padding:5,
    borderRadius:10
  }
});

export default FormScreen;
