import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Router } from '@router'
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import { PagesLang } from '@pages'
import { getStoredLanguage } from '@utils'
import './styles/globals.css'

i18next.use(initReactI18next).init({
	lng: 'es',
	fallbackLng: 'en',

	resources: {
		es: {
			Pages: PagesLang?.es,
		},
		en: {
			Pages: PagesLang?.en,
		},
	},

	interpolation: {
		escapeValue: false,
	},
})

i18next.changeLanguage(getStoredLanguage())

createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<RouterProvider router={Router} />
	</StrictMode>
)
