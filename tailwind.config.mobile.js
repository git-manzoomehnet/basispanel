/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [],
    theme: {
      extend: {
       
      },
    },
    plugins: [],
  }
  
  /** @type {import('tailwindcss').Config} */
  const plugin = require('tailwindcss/plugin')
  module.exports = {
    content: [
      './**/*.{html,js}',
      './css/**/*.css',
      './js/**/*.js',
    
    ],
    darkMode: 'class',
  
    theme: {
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
        xxl:'1500px',
      },
      colors: {
        'White':'#fff',
        'black':'#000000',
        'primary':'#004B85',
        'secondaryBG':'#E6F7F5',
        'hoverBtnDprimary':'#013c6a',
        'hoverBtlightBlue':'#cfd3d6',
        'lightBlue':'#E6EDF3',
         'textGray':'#494949',
         'blue':'#022A4C',
         'blue2':'#5A96C9',
         'blue3':'#0E4D82',
         'gray':'#555555',
         'bgGray':'#E5E5E5',
         'secondary':'#00A693',
         'red':'#F9461C',
         'redBG':'#FFEDE9',
         'text':'#68737C',
         'gray1':"#3A3A3A",
         'lightBG':'#FAFAFA',
         'mainGray':'#C8CCCF',
         'white1':'#FEFEFE',
         'dark':'#252733',
         'dark2':'#1A1C24',
         'dark3':'#212121',
         'placeholder':'#222222',
         'borderP':'#6D6E71',
         'color1':'#FFE6DB',
         'color2':'#F7EEFF',
         'color3':'#E7F3E7',
         'blue4':'#70A0EC',
         'orange':'#DE633D',
         'pink':'#E01172',
         'light3':'#F9F9F9',
         'orange':'#FFB238',
         'purple':'#5F39DD',
         'gray3':'#FBFBFB'
          
      },
  
      fontFamily: {
        'IRANSansWeb300': ['IRANSansWeb300', 'IRANSansWeb300'],
        'IRANSansWeb400': ['IRANSansWeb400', 'IRANSansWeb400'],
        'IRANSansWeb500': ['IRANSansWeb500', 'IRANSansWeb500'],
        'IRANSansWeb600': ['IRANSansWeb600', 'IRANSansWeb600'],
        'IRANSansWeb700': ['IRANSansWeb700', 'IRANSansWeb700'],
        'IRANSansWeb800': ['IRANSansWeb800', 'IRANSansWeb800'],
        'IRANSansWeb900': ['IRANSansWeb900', 'IRANSansWeb900'],
         'Inter400':['Inter400'],
         'interBold':['interBold'],
         'NotoSans400':['NotoSans400'],
         'ABeeZee400':['ABeeZee400'],
  
      },
      extend: {
        
        content:{
    'content1':' '
        },
        lineHeight: {
          '18.78': '18.78px',
          '64': '64px',
          '23':'23px',
          '25.4':'25.04px',
          '57.97':'57.97px',
          '17.96': '17.96px',
          '21.91': '21.91px',
          '32.03':'32.03px',
          '56.35':'56.35px',
          '25.04':'25.04px',
          '37.97':'37.97px',
          '37.57':'37.57px',
          '31.03':'31.03px',
          '28.17':'28.17px',
          '18.78':'18.78px',
           '20.25':'20.25px',
           '24':'24px',
           '46.96':'46.96px',
           '16.41':'16.41px',
           '14.06':'14.06px',
           '18.75':'18.75px',
           '31':'31px',
           '43.4':'43.4px',
           '17.05':'17.05px',
           '21':'21px',
           '24.18':'24.18px',
           '27.09':'27.09px',
           '20.15':'20.15px',
           '35':'35px',
           '28':'28px',
           '41':'41px',
           '55':'55px',
           '48':'48px',
           '32':'32px',
           '40.96':'40.96px',
         
  
        },
  
        width:{
          '85p':'85%',
          '90p':'90%',
          '80p':'80%',
          '95p':'95%',
  
          '95p':'95%',
        },
        maxWidth: {
          'x100': '100%',
        },
        zIndex: {
          '1': '1',
          '2': '2',
          '3': '3',
  
        },
        borderRadius:{
         '5':'5px'
        }
      },
      translate: {
        '100': '-100%',
      }
    },
    
    
  }