import React from 'react'
import PropTypes from 'prop-types'
import './Definitions.css'

const Definitions = ({ word, meanings, category, lightMode }) => {
  return (
    <div className='meanings'>
      {meanings[0] && word && category === 'en' && (
        <audio
          src={meanings[0].phonetics[0] && meanings[0].phonetics[0].audio}
          style={{ backgroundColor: '#fff', borderRadius: 10 }}
          controls>
          Your browser doesn't support audio element.
        </audio>
      )}

      {word === '' ? (
        <span className='subTitle'>Start by typing a word in search</span>
      ) : (
        meanings.map((mean) =>
          mean.meanings.map((item) =>
            item.definitions.map((def) => (
              <div
                className='singleMean'
                style={{
                  backgroundColor: lightMode ? '#3b5360' : 'white',
                  color: lightMode ? ' white' : 'black',
                }}>
                <b>{def.definition}</b>
                <hr style={{ backgroundColor: 'black', width: '100%' }} />
                {def.example && (
                  <span>
                    <b>Example :</b>
                    {def.example}
                  </span>
                )}

                {def.synonyms && (
                  <span>
                    <b>Synonyms :</b>
                    {def.synonyms.map((syn) => `${syn},`)}
                  </span>
                )}
              </div>
            ))
          )
        )
      )}
    </div>
  )
}

Definitions.propTypes = {
  word: PropTypes.string.isRequired,
  meanings: PropTypes.array.isRequired,
  category: PropTypes.string.isRequired,
  lightMode: PropTypes.bool.isRequired,
}

export default Definitions
