import '../styles/index.scss'
import type { AppProps } from 'next/app'
import Feed from '../src/Feed'

export default function App({ Component, pageProps }: AppProps) {
  return <Feed {...pageProps} />
}
