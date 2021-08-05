import React from 'react'
import PropTypes from 'prop-types'
import category from '../../data/category'
import {
  TextField,
  createTheme,
  ThemeProvider,
  MenuItem,
} from '@material-ui/core'
import './Header.css'

const Header = ({
  searchWord,
  setSearchWord,
  languageCategory,
  setLanguageCategory,
  lightMode,
}) => {
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: lightMode ? '#000' : '#fff',
      },
      type: lightMode ? 'light' : 'dark',
    },
  })

  const handleChange = (value) => {
    setLanguageCategory(value)
    setSearchWord('')
  }

  return (
    <div className='header'>
      <span className='title'>{searchWord ? searchWord : 'Word Finder'}</span>

      <div className='inputs'>
        <ThemeProvider theme={darkTheme}>
          <TextField
            className='search'
            id='standard-basic'
            label='Search a word'
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
          />

          <TextField
            id='standard-select-currency'
            select
            className='select'
            label='Language'
            value={languageCategory}
            onChange={(e) => handleChange(e.target.value)}>
            {category.map((option) => (
              <MenuItem key={option.label} value={option.label}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
        </ThemeProvider>
      </div>
    </div>
  )
}

Header.propTypes = {
  languageCategory: PropTypes.string.isRequired,
  setLanguageCategory: PropTypes.func.isRequired,
  lightMode: PropTypes.bool.isRequired,
  searchWord: PropTypes.string.isRequired,
  setSearchWord: PropTypes.func.isRequired,
}

export default Header
