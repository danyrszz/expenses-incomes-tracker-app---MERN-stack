import { useState } from 'react'
import Menu from './Menu';
import './styles/HeaderBar.css'

export default function HeaderBar () {
  const [title, setTitle] = useState('Home');
  return(
    <div className='header'>
      <Menu/>
      <p>{title}</p>
    </div>
  )
}