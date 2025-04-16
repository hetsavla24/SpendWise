import React, { createContext, useContext, useState, useEffect } from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Initialize i18next
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        settings: 'Settings',
        darkMode: 'Dark Mode',
        language: 'Language',
        currency: 'Currency',
        notifications: 'Notifications',
        welcome_back: 'Welcome back, {{name}}!',
        financial_overview_message: 'Your financial overview is looking great this month!',
        premium_user: 'Premium User',
        profile: 'Profile',
        logout: 'Logout',
        dashboard: 'Dashboard',
        transactions: 'Transactions',
        budget: 'Budget',
        reports: 'Reports',
        goals: 'Goals',
        investments: 'Investments',
        calendar: 'Calendar',
        customize_experience: 'Customize your SpendWise experience',
        appearance_language: 'Appearance & Language',
        currency_regional: 'Currency & Regional',
        notifications_alerts: 'Notifications & Alerts',
        additional_features: 'Additional Features',
        dark_mode_description: 'Enable dark theme for better visibility in low light',
        push_notifications: 'Push Notifications',
        push_notifications_description: 'Receive important updates and alerts',
        email_notifications: 'Email Notifications',
        email_notifications_description: 'Get updates and reports via email',
        budget_alerts: 'Budget Alerts',
        budget_alerts_description: 'Get notified when approaching budget limits',
        weekly_reports: 'Weekly Reports',
        weekly_reports_description: 'Receive weekly spending analysis reports',
        auto_sync: 'Auto Sync',
        auto_sync_description: 'Automatically sync data across devices',
        financial_management: 'Financial Management',
        total_balance: 'Total Balance',
        monthly_income: 'Monthly Income',
        monthly_expenses: 'Monthly Expenses',
        net_savings: 'Net Savings'
      },
    },
    es: {
      translation: {
        settings: 'Configuración',
        darkMode: 'Modo Oscuro',
        language: 'Idioma',
        currency: 'Moneda',
        notifications: 'Notificaciones',
        welcome_back: '¡Bienvenido de nuevo, {{name}}!',
        financial_overview_message: '¡Tu resumen financiero se ve genial este mes!',
        premium_user: 'Usuario Premium',
        profile: 'Perfil',
        logout: 'Cerrar Sesión',
        dashboard: 'Panel',
        transactions: 'Transacciones',
        budget: 'Presupuesto',
        reports: 'Informes',
        goals: 'Objetivos',
        investments: 'Inversiones',
        calendar: 'Calendario',
        customize_experience: 'Personaliza tu experiencia SpendWise',
        appearance_language: 'Apariencia e Idioma',
        currency_regional: 'Moneda y Regional',
        notifications_alerts: 'Notificaciones y Alertas',
        additional_features: 'Características Adicionales',
        dark_mode_description: 'Activa el tema oscuro para mejor visibilidad con poca luz',
        push_notifications: 'Notificaciones Push',
        push_notifications_description: 'Recibe actualizaciones y alertas importantes',
        email_notifications: 'Notificaciones por Email',
        email_notifications_description: 'Recibe actualizaciones e informes por email',
        budget_alerts: 'Alertas de Presupuesto',
        budget_alerts_description: 'Recibe notificaciones al acercarte a los límites del presupuesto',
        weekly_reports: 'Informes Semanales',
        weekly_reports_description: 'Recibe informes semanales de análisis de gastos',
        auto_sync: 'Sincronización Automática',
        auto_sync_description: 'Sincroniza automáticamente los datos entre dispositivos',
        financial_management: 'Gestión Financiera',
        total_balance: 'Balance Total',
        monthly_income: 'Ingresos Mensuales',
        monthly_expenses: 'Gastos Mensuales',
        net_savings: 'Ahorro Neto'
      },
    },
    fr: {
      translation: {
        settings: 'Paramètres',
        darkMode: 'Mode Sombre',
        language: 'Langue',
        currency: 'Devise',
        notifications: 'Notifications',
        welcome_back: 'Bon retour, {{name}} !',
        financial_overview_message: 'Votre aperçu financier est excellent ce mois-ci !',
        premium_user: 'Utilisateur Premium',
        profile: 'Profil',
        logout: 'Déconnexion',
        dashboard: 'Tableau de Bord',
        transactions: 'Transactions',
        budget: 'Budget',
        reports: 'Rapports',
        goals: 'Objectifs',
        investments: 'Investissements',
        calendar: 'Calendrier',
        customize_experience: 'Personnalisez votre expérience SpendWise',
        appearance_language: 'Apparence et Langue',
        currency_regional: 'Devise et Régional',
        notifications_alerts: 'Notifications et Alertes',
        additional_features: 'Fonctionnalités Supplémentaires',
        dark_mode_description: 'Activez le thème sombre pour une meilleure visibilité en faible luminosité',
        push_notifications: 'Notifications Push',
        push_notifications_description: 'Recevez des mises à jour et des alertes importantes',
        email_notifications: 'Notifications par Email',
        email_notifications_description: 'Recevez des mises à jour et des rapports par email',
        budget_alerts: 'Alertes Budget',
        budget_alerts_description: 'Soyez notifié lorsque vous approchez des limites budgétaires',
        weekly_reports: 'Rapports Hebdomadaires',
        weekly_reports_description: 'Recevez des rapports hebdomadaires d\'analyse des dépenses',
        auto_sync: 'Synchronisation Automatique',
        auto_sync_description: 'Synchronisez automatiquement les données entre les appareils',
        financial_management: 'Gestion Financière',
        total_balance: 'Solde Total',
        monthly_income: 'Revenu Mensuel',
        monthly_expenses: 'Dépenses Mensuelles',
        net_savings: 'Épargne Nette'
      },
    },
    hi: {
      translation: {
        settings: 'सेटिंग्स',
        darkMode: 'डार्क मोड',
        language: 'भाषा',
        currency: 'मुद्रा',
        notifications: 'सूचनाएं',
        welcome_back: 'वापसी पर स्वागत है, {{name}}!',
        financial_overview_message: 'इस महीने आपका वित्तीय विवरण बहुत अच्छा दिख रहा है!',
        premium_user: 'प्रीमियम उपयोगकर्ता',
        profile: 'प्रोफ़ाइल',
        logout: 'लॉग आउट',
        dashboard: 'डैशबोर्ड',
        transactions: 'लेन-देन',
        budget: 'बजट',
        reports: 'रिपोर्ट',
        goals: 'लक्ष्य',
        investments: 'निवेश',
        calendar: 'कैलेंडर',
        customize_experience: 'अपने SpendWise अनुभव को अनुकूलित करें',
        appearance_language: 'दिखावट और भाषा',
        currency_regional: 'मुद्रा और क्षेत्रीय',
        notifications_alerts: 'सूचनाएं और अलर्ट',
        additional_features: 'अतिरिक्त सुविधाएं',
        dark_mode_description: 'कम रोशनी में बेहतर दृश्यता के लिए डार्क थीम सक्षम करें',
        push_notifications: 'पुश सूचनाएं',
        push_notifications_description: 'महत्वपूर्ण अपडेट और अलर्ट प्राप्त करें',
        email_notifications: 'ईमेल सूचनाएं',
        email_notifications_description: 'ईमेल द्वारा अपडेट और रिपोर्ट प्राप्त करें',
        budget_alerts: 'बजट अलर्ट',
        budget_alerts_description: 'बजट सीमा के करीब पहुंचने पर सूचित हों',
        weekly_reports: 'साप्ताहिक रिपोर्ट',
        weekly_reports_description: 'साप्ताहिक खर्च विश्लेषण रिपोर्ट प्राप्त करें',
        auto_sync: 'स्वचालित सिंक',
        auto_sync_description: 'डिवाइस के बीच डेटा स्वचालित रूप से सिंक करें',
        financial_management: 'वित्तीय प्रबंधन',
        total_balance: 'कुल शेष',
        monthly_income: 'मासिक आय',
        monthly_expenses: 'मासिक खर्च',
        net_savings: 'शुद्ध बचत'
      },
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    i18n.changeLanguage(language.toLowerCase().slice(0, 2));
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 