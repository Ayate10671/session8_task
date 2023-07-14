import React from 'react'

import  { useState, useEffect } from 'react'

const GeneratorPassword = () => {
  const [password, setPassword] = useState('')
  const [passwordLength, setPasswordLength] = useState(0)
  const [uppercase, setUppercase] = useState(false)
  const [lowercase, setLowercase] = useState(false)
  const [numbers, setNumbers] = useState(false)
  const [symbols, setSymbols] = useState(false)
  const [errors, setErrors] = useState({})

  const generatePassword = () => {
    setErrors({})
    if (!uppercase && !lowercase && !numbers && !symbols) {
      return setErrors('You must selesct at least one type ')
    } else if (passwordLength === '0') {
      return setErrors('Password length cannot == 0')
    } else if (passwordLength === '') {
      return setErrors('Invalid password length')
    } else if (passwordLength > 30) {
      return setErrors('Password length cannot > 30 characters')
    }

    let password = ''
    for (let i = 0; i < passwordLength; i++) {
      let choice = random(0, 3)
      if (lowercase && choice === 0) {
        password += randomLower()
      } else if (uppercase && choice === 1) {
        password += randomUpper()
      } else if (symbols && choice === 2) {
        password += randomSymbol()
      } else if (numbers && choice === 3) {
        password += random(0, 9)
      } else {
        i--
      }
    }
    setPassword(password)
  }

  const random = (min = 0, max = 1) => {
    return Math.floor(Math.random() * (max + 1 - min) + min)
  }

  const randomLower = () => {
    return String.fromCharCode(random(97, 122))
  }

  const randomUpper = () => {
    return String.fromCharCode(random(65, 90))
  }

  const randomSymbol = () => {
    const symbols = "~*$%@#^&!?*'-=/,.{}()[]<>"
    return symbols[random(0, symbols.length - 1)]
  }

  useEffect(() => {
    generatePassword()
  }, [])

  return (
    <div className='app'>
      <h1> Generator Password</h1>
      <div className='password'>{password}</div>
      <div className='container'>
        <div className='subContainer'>
          <div className='choose'>
            <label>Password length</label>
            <input
              type='number'
              name='length'
              min='0'
              max='50'
              defaultValue={passwordLength}
              onChange={(e) => setPasswordLength(e.target.value)}
            />
          </div>

          <div className='choose'>
            <label> Uppercase Letters</label>
            <input
              type='checkbox'
              name='uppercase'
              defaultChecked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
            />
          </div>

          <div className='choose'>
            <label> Lowercase Letters</label>
            <input
              type='checkbox'
              name='lowercase'
              defaultChecked={lowercase}
              onChange={(e) => setLowercase(e.target.checked)}
            />
          </div>

          <div className='choose'>
            <label> Numbers</label>
            <input
              type='checkbox'
              name='numbers'
              defaultChecked={numbers}
              onChange={(e) => setNumbers(e.target.checked)}
            />
          </div>

          <div className='choose'>
            <label> Symbols</label>
            <input
              type='checkbox'
              name='symbols'
              defaultChecked={symbols}
              onChange={(e) => setSymbols(e.target.checked)}
            />
          </div>

          {errors.length && <li className='error'>{errors}</li>}

          <div className='button'>
            <input
              type='submit'
              name='generate'
              value='Generate'
              onClick={generatePassword}
            />
          </div>
        </div>
      </div>
      
    </div>

   
  )
}

export default GeneratorPassword