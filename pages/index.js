import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/admin/Home.module.css'
import AdminPanel from '../components/admin/AdminPanel';

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Start Page</h1>
    </div>
  )
}
