import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import AdminPanel from '../components/AdminPanel';

export const getStaticProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await res.json();

  return {
    props: { users: data }
  }
}

export default function Home({users}) {
  return (
    <div className={styles.container}>
      <AdminPanel/>
    </div>
  )
}
