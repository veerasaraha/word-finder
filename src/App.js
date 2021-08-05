import { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Switch, withStyles } from '@material-ui/core'
import Header from './components/Header/Header'
import Definitions from './components/Definitions/Definitions'
import { grey } from '@material-ui/core/colors'

function App() {
  const [searchWord, setSearchWord] = useState('')
  const [meanings, setMeanings] = useState([])
  const [category, setCategory] = useState('en')
  const [lightMode, setLightMode] = useState(false)

  const DarkMode = withStyles({
    switchBase: {
      color: grey[300],
      '&$checked': {
        color: grey[500],
      },
      '&$checked + $track': {
        backgroundColor: grey[500],
      },
    },
    checked: {},
    track: {},
  })(Switch)

  useEffect(() => {
    const dictionaryAPI = async () => {
      try {
        const res = await axios.get(
          `https://api.dictionaryapi.dev/api/v2/entries/${category}/${searchWord}`
        )
        setMeanings(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    dictionaryAPI()
  }, [category, searchWord])

  return (
    <div
      style={{
        height: '100vh',
        backgroundColor: lightMode ? '#fff' : '#282c34',
        color: lightMode ? 'black' : 'white',
        transition: 'all 0.5s linear',
      }}>
      <Container
        maxWidth='md'
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          justifyContent: 'space-evenly',
        }}>
        <div
          style={{ position: 'absolute', top: 0, right: 15, paddingTop: 10 }}>
          <span>{lightMode ? 'Dark' : 'Light'} Mode</span>
          <DarkMode
            checked={lightMode}
            onChange={() => setLightMode(!lightMode)}
          />
        </div>

        <Header
          languageCategory={category}
          setLanguageCategory={setCategory}
          searchWord={searchWord}
          setSearchWord={setSearchWord}
          lightMode={lightMode}
        />
        {meanings && (
          <Definitions
            word={searchWord}
            meanings={meanings}
            category={category}
            lightMode={lightMode}
          />
        )}
      </Container>
    </div>
  )
}

export default App
