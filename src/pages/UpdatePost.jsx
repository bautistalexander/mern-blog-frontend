import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';

export const UpdatePost = () => {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();
  const { postId } = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    try {
      const fetchPost = async () => {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          setPublishError(null);
          setFormData(data.posts[0]);
        }
      };
      fetchPost();
    } catch (error) {
      console.log(error.message);
    }
  }, [postId]);

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError('Por favor, seleccione una imagen');
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError('Carga de imagen Fallida');
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError('Carga de imagen Fallida');
      setImageUploadProgress(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/post/updatepost/${formData._id}/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.error);
        return;
      }
      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`)
      }

    } catch (error) {
      setPublishError('Se produjo un error');
      console.log(error);
    }
  };

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Actualizar Post</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput type='text' placeholder='Escribir título' id='title' className='flex-1' required
            onChange={(e) => setFormData({
              ...formData, title: e.target.value
            })}
            value={formData.title}
          />
          <Select onChange={
            (e) => setFormData({
              ...formData, category: e.target.value
            })}
            value={formData.category}
          >
            <option value='uncategory'>Seleccionar una Categoria</option>
            <option value='Javascript'>JavaScript</option>
            <option value='Reactjs'>React.js</option>
            <option value='Fundamentos-Digitales'>Fundamentos Digitales</option>
            <option value='Organizacion-de-Computadoras'>Organización de Computadoras</option>

          </Select>
        </div>
        <div className='flex gap-4 items-center justify-between border-4 border-teal-200 border-dotted p-3'>
          <FileInput type='file' accept='image/*' onChange={(e) => setFile(e.target.files[0])} />
          <Button type='button' gradientDuoTone='redToYellow' size='sm' outline onClick={handleUploadImage} disabled={imageUploadProgress}>
            {
              imageUploadProgress ? (
                <div className='w-16 h-16'>
                  <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`} />
                </div>
              ) : (
                'Subir imagen'
              )
            }
          </Button>
        </div>
        {
          imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>
        }
        {
          formData.image && (
            <img src={formData.image} alt='upload' className='w-full h-72 object-cover' />
          )
        }
        <ReactQuill theme='snow' placeholder='Escribe detalles...' className='h-72 mb-12'
          onChange={
            (value) => {
              setFormData({ ...formData, content: value });
            }
          }
          value={formData.content}
        />
        <Button type='submit' gradientDuoTone='purpleToBlue'>Guardar Cambios</Button>
        {
          publishError && <Alert className='mt-5' color='failure'>{publishError}</Alert>
        }
      </form>
    </div>
  )
}
