export const translations = {
    en: {
        nav: {
            about: "About",
            privacy: "Privacy",
            startNow: "Start Now",
        },
        hero: {
            new: "New: AI-Powered Pathways 2.0",
            title: "Find the best immigration pathways for",
            profile: "your profile",
            description: "Get personalized guidance for moving abroad. Whether you want to study, work, or start a business, our AI analyzes your profile against global opportunities.",
            startSearch: "Start Your Search",
            learnMore: "Learn More",
            trusted: "Trusted by 5,000+ explorers worldwide",
        },
        howItWorks: {
            title: "Three simple steps to",
            future: "your future",
            description: "We've simplified the complex world of immigration into a clear, actionable process.",
            step1: {
                title: "Complete Your Profile",
                description: "Tell us about your education, work history, and goals through our intuitive wizard.",
            },
            step2: {
                title: "Connect AI Assistant",
                description: "Provide your API key to securely process your profile. We never store your sensitive data.",
            },
            step3: {
                title: "Receive Your Plan",
                description: "Get 3-6 personalized pathways with official links, costs, and step-by-step guidance.",
            },
        },
        features: {
            title: "Why trust our",
            aiGuidance: "AI guidance?",
            description: "Immigration is one of the biggest life decisions you'll make. Our tool provides clarity in a world of complex regulations.",
            list: [
                "Analyzes 100+ global immigration pathways simultaneously",
                "Direct links to official government application portals",
                "Real-time estimates for costs and processing times",
                "100% data privacy with local API key storage",
            ],
            categories: {
                study: "Study Abroad",
                work: "Work Visas",
                nomad: "Digital Nomads",
                startups: "Startups",
            },
        },
        cta: {
            title: "Ready to find your way?",
            description: "Start your journey today and discover the path that's right for you with our AI-powered guidance.",
            button: "Get Started Now",
            successStories: "View Success Stories",
        },
        footer: {
            about: "About Us",
            privacy: "Privacy Policy",
            terms: "Terms of Service",
            description: "Empowering global explorers with AI-powered immigration roadmaps. Our goal is to make moving abroad transparent, accessible, and structured for everyone.",
            company: "Company",
            resources: "Resources",
            start: "Start Assessment",
            docs: "Documentation",
            links: "Official Links",
            built: "Built for global connectivity.",
            secured: "Data Secured Locally"
        },
        wizard: {
            next: "Next",
            back: "Back",
            yes: "Yes",
            no: "No",
            yearsLabel: "years",
            generate: "Generate Pathways",
            generating: "Generating...",
            continue: "Continue & Review",
            steps: {
                basic: "Basic Info",
                goal: "Your Goal",
                education: "Education",
                work: "Work Experience",
                preferences: "Preferences",
                documents: "Documents",
                ai: "AI Setup",
                review: "Review"
            },
            basicInfo: {
                title: "Let's start with the basics",
                description: "This helps us filter pathways by your eligibility.",
                nationality: "Country of Citizenship",
                residence: "Current Country of Residence",
                age: "Age",
                languages: "Languages you speak fluently",
                languagesPlaceholder: "e.g., English, French, Spanish"
            },
            goals: {
                title: "What's your primary goal?",
                description: "Choose the path that best matches your intentions.",
                study: {
                    title: "Study Abroad",
                    description: "Degrees, research, or language courses."
                },
                work: {
                    title: "Work Visa",
                    description: "Employment, skilled worker programs, or sponsorship."
                },
                both: {
                    title: "Study & Work",
                    description: "Considering both academic and professional opportunities."
                },
                business: {
                    title: "Startup / Investment",
                    description: "Business visas and entrepreneurship programs."
                },
                family: {
                    title: "Family Reunion",
                    description: "Join family members already residing abroad."
                },
                asylum: {
                    title: "Asylum / Protection",
                    description: "Seeking international protection (General info only)."
                }
            },
            education: {
                title: "Your Educational Background",
                description: "Tell us about your highest level of completed education.",
                level: "Highest Degree Earned",
                field: "Field of Study",
                fieldPlaceholder: "e.g., Computer Science, Medicine, Arts",
                gpa: "GPA / Grade Average (Optional)",
                levels: {
                    highSchool: "High School",
                    bachelor: "Bachelor's Degree",
                    master: "Master's Degree",
                    phd: "PhD / Doctorate"
                }
            },
            work: {
                title: "Professional Experience",
                description: "Your work history helps determine skill-based visa eligibility.",
                titleLabel: "Job Title",
                titlePlaceholder: "e.g., Senior Software Engineer",
                years: "Years of Experience",
                skills: "Key Skills (comma separated)",
                skillsPlaceholder: "e.g., Project Management, Python, Sales"
            },
            preferences: {
                title: "Personal Preferences",
                description: "Help us narrow down the locations and styles of your transition.",
                countries: "Target Countries",
                budget: "Budget Range",
                timeframe: "Timeframe",
                willingToLearn: "Willing to learn a new language?",
                languageNote: "This expands your opportunities in many European and Asian countries.",
                budgetLabels: {
                    low: "Budget-Friendly",
                    medium: "Moderate",
                    high: "Premium"
                },
                timeframeLabels: {
                    asap: "Right Now",
                    sixMonths: "Within 6 Months",
                    oneYear: "1+ Year"
                }
            },
            documents: {
                title: "Document Readiness Checklist",
                description: "Checking these boxes helps the AI understand your current readiness and provide more accurate timelines.",
                passport: "Valid Passport",
                bankStatement: "Proof of Funds (Bank Statement)",
                languageTest: "Language Test Results (IELTS, TOEFL, etc.)",
                degree: "Educational Degrees & Transcripts",
                cv: "Updated Professional CV/Resume",
                readinessNote: "Don't worry if you don't have all these documents yet. The AI can still suggest pathways, but it will include these as required next steps in your plan."
            },
            ai: {
                title: "AI Configuration",
                description: "By default, we use a free Gemini 2.5 Flash module. You don't need to provide a key to get started. If you want better output, please select your module, add your API key, and click Test & Save.",
                freeAccess: "Default Free Access",
                company: "Select AI Company",
                model: "Select Model",
                apiKeyLabel: "API Key (Optional)",
                secureStorage: "Secure Browser Storage",
                testButton: "Test & Save Configuration",
                verifying: "Verifying Connection...",
                working: "Model is working perfectly!",
                testFailed: "Test failed. Please check your key.",
                networkError: "Network error during test.",
                autoFill: "Auto-fill with example profile",
                placeholderGoogle: "AIza...",
                placeholderOpenAI: "sk-..."
            },
            review: {
                title: "Review Your Profile",
                description: "Make sure everything is correct before generating your pathways.",
                ready: "Ready to discover your pathways?",
                clickGenerate: "Clicking generate will call the AI using your provided key."
            }
        },
        results: {
            generatedSuccess: "Pathways Generated Successfully!",
            title: "Your Global",
            roadmap: "Roadmap",
            description: "Our AI has analyzed your profile and found the most promising immigration options tailored specifically for your goals.",
            optionsCount: "Pathways",
            totalOptions: "Total Options",
            startOver: "Start New Search",
            exploreOptions: "Explore Your Options",
            verified: "Verified AI Generation",
            sources: "Official Sources Linked",
            backHome: "Back to Home",
            disclaimer: "AI-generated roadmap for informational purposes. Always cross-reference with official migration portals.",
            quote: "The journey of a thousand miles begins with this step.",
            copy: "Copy Results",
            export: "Download PDF",
            save: "Save Pathway",
            pathway: {
                difficulty: "Difficulty",
                timeline: "Timeline",
                cost: "Estimated Cost",
                requirements: "Requirements",
                documents: "Documents Needed",
                steps: "Application Steps",
                officialLinks: "Official Resources",
                warnings: "Important Warnings",
                actions: "Recommended Actions",
                bestFor: "Best For"
            }
        },
        privacyPage: {
            title: "Privacy Policy",
            lastUpdated: "Last updated:",
            introTitle: "Your Privacy is Our Priority",
            introText: "Immigration Pathways is designed with a privacy-first approach. We believe that your personal data and credentials should remain under your control at all times.",
            localKeyTitle: "Local API Key Storage",
            localKeyText: "Your AI API key is stored only in your browser's local storage. We never send it to our servers.",
            noDbTitle: "No Database Storage",
            noDbText: "We do not use a database to store your personal profile information. Everything stays in your browser.",
            noTrackTitle: "No Tracking",
            noTrackText: "We do not track your specific searches or the pathways generated. Your session is private.",
            secureCallsTitle: "Secure AI Calls",
            secureCallsText: "API calls are made using your key directly to the AI provider. We act only as a bridge.",
            infoSectionTitle: "Information We Collect",
            infoSectionText: "The profile information you enter in the wizard (nationality, age, work experience, etc.) is processed only to generate the AI prompt. It is not permanently stored anywhere outside of your local browser session.",
            aiUsageTitle: "AI Usage",
            aiUsageText: "When you use this application, your data is sent to the AI provider (e.g., OpenAI) to generate your pathways. By using your own API key, you are subject to that provider's privacy policy and terms of service."
        }
    },
    fr: {
        nav: {
            about: "À propos",
            privacy: "Confidentialité",
            startNow: "Démarrer",
        },
        hero: {
            new: "Nouveau : Parcours IA 2.0",
            title: "Trouvez les meilleurs parcours d'immigration pour",
            profile: "votre profil",
            description: "Obtenez des conseils personnalisés pour partir à l'étranger. Que vous souhaitiez étudier, travailler ou créer une entreprise, notre IA analyse votre profil par rapport aux opportunités mondiales.",
            startSearch: "Commencer la recherche",
            learnMore: "En savoir plus",
            trusted: "Approuvé par plus de 5 000 explorateurs dans le monde",
        },
        howItWorks: {
            title: "Trois étapes simples vers",
            future: "votre avenir",
            description: "Nous avons simplifié le monde complexe de l'immigration en un processus clair et exploitable.",
            step1: {
                title: "Complétez votre profil",
                description: "Parlez-nous de vos études, de votre expérience professionnelle et de vos objectifs via notre assistant intuitif.",
            },
            step2: {
                title: "Connectez l'assistant IA",
                description: "Fournissez votre clé API pour traiter votre profil en toute sécurité. Nous ne stockons jamais vos données sensibles.",
            },
            step3: {
                title: "Recevez votre plan",
                description: "Obtenez 3 à 6 parcours personnalisés avec des liens officiels, les coûts et des conseils étape par étape.",
            },
        },
        features: {
            title: "Pourquoi faire confiance à notre",
            aiGuidance: "guide IA ?",
            description: "L'immigration est l'une des décisions les plus importantes de votre vie. Notre outil apporte de la clarté dans un monde de réglementations complexes.",
            list: [
                "Analyse plus de 100 parcours d'immigration mondiaux simultanément",
                "Liens directs vers les portails de candidature officiels des gouvernements",
                "Estimations en temps réel des coûts et des délais de traitement",
                "Confidentialité totale des données avec stockage local des clés API",
            ],
            categories: {
                study: "Études à l'étranger",
                work: "Visas de travail",
                nomad: "Nomades numériques",
                startups: "Startups",
            },
        },
        cta: {
            title: "Prêt à trouver votre voie ?",
            description: "Commencez votre voyage aujourd'hui et découvrez le chemin qui vous convient grâce à nos conseils basés sur l'IA.",
            button: "Commencer maintenant",
            successStories: "Voir les témoignages",
        },
        footer: {
            about: "À propos de nous",
            privacy: "Politique de confidentialité",
            terms: "Conditions d'utilisation",
            description: "Donner aux explorateurs du monde entier les moyens d'agir grâce à des feuilles de route d'immigration basées sur l'IA. Notre objectif est de rendre l'expatriation transparente, accessible et structurée pour tous.",
            company: "Entreprise",
            resources: "Ressources",
            start: "Commencer l'évaluation",
            docs: "Documentation",
            links: "Liens officiels",
            built: "Conçu pour une connectivité mondiale.",
            secured: "Données sécurisées localement"
        },
        wizard: {
            next: "Suivant",
            back: "Retour",
            yes: "Oui",
            no: "Non",
            yearsLabel: "ans",
            generate: "Générer les parcours",
            generating: "Génération...",
            continue: "Continuer et réviser",
            steps: {
                basic: "Infos de base",
                goal: "Votre objectif",
                education: "Éducation",
                work: "Expérience",
                preferences: "Préférences",
                documents: "Documents",
                ai: "Configuration IA",
                review: "Révision"
            },
            basicInfo: {
                title: "Commençons par l'essentiel",
                description: "Cela nous aide à filtrer les parcours selon votre éligibilité.",
                nationality: "Citoyenneté",
                residence: "Pays de résidence actuel",
                age: "Âge",
                languages: "Langues parlées couramment",
                languagesPlaceholder: "ex: Anglais, Français, Espagnol"
            },
            goals: {
                title: "Quel est votre objectif principal ?",
                description: "Choisissez le chemin qui correspond le mieux à vos intentions.",
                study: {
                    title: "Étudier à l'étranger",
                    description: "Diplômes, recherche ou cours de langue."
                },
                work: {
                    title: "Visa de travail",
                    description: "Emploi, travailleurs qualifiés ou parrainage."
                },
                both: {
                    title: "Études et Travail",
                    description: "Envisagez des opportunités académiques et professionnelles."
                },
                business: {
                    title: "Startup / Investissement",
                    description: "Visas d'affaires et programmes d'entrepreneuriat."
                },
                family: {
                    title: "Regroupement familial",
                    description: "Rejoindre des membres de la famille résidant déjà à l'étranger."
                },
                asylum: {
                    title: "Asile / Protection",
                    description: "Recherche d'une protection internationale (Infos générales)."
                }
            },
            education: {
                title: "Votre parcours éducatif",
                description: "Parlez-nous de votre plus haut niveau d'études complétées.",
                level: "Plus haut diplôme obtenu",
                field: "Domaine d'études",
                fieldPlaceholder: "ex: Informatique, Médecine, Arts",
                gpa: "Moyenne / GPA (Optionnel)",
                levels: {
                    highSchool: "Lycée / Baccalauréat",
                    bachelor: "Licence / Bac+3",
                    master: "Master / Bac+5",
                    phd: "Doctorat / PhD"
                }
            },
            work: {
                title: "Expérience professionnelle",
                description: "Votre historique professionnel aide à déterminer l'éligibilité aux visas basés sur les compétences.",
                titleLabel: "Titre du poste",
                titlePlaceholder: "ex: Ingénieur logiciel senior",
                years: "Années d'expérience",
                skills: "Compétences clés (séparées par des virgules)",
                skillsPlaceholder: "ex: Gestion de projet, Python, Ventes"
            },
            preferences: {
                title: "Préférences personnelles",
                description: "Aidez-nous à affiner les lieux et les styles de votre transition.",
                countries: "Pays ciblés",
                budget: "Échelle budgétaire",
                timeframe: "Délai",
                willingToLearn: "Prêt à apprendre une nouvelle langue ?",
                languageNote: "Cela élargit vos opportunités dans de nombreux pays européens et asiatiques.",
                budgetLabels: {
                    low: "Économique",
                    medium: "Modéré",
                    high: "Premium"
                },
                timeframeLabels: {
                    asap: "Dès que possible",
                    sixMonths: "Dans les 6 mois",
                    oneYear: "1 an et plus"
                }
            },
            documents: {
                title: "Liste de préparation des documents",
                description: "Cocher ces cases aide l'IA à comprendre votre état de préparation actuel et à fournir des délais plus précis.",
                passport: "Passeport valide",
                bankStatement: "Preuve de fonds (Relevé bancaire)",
                languageTest: "Résultats de test de langue (IELTS, TOEFL, etc.)",
                degree: "Diplômes et relevés de notes",
                cv: "CV professionnel à jour",
                readinessNote: "Ne vous inquiétez pas si vous n'avez pas encore tous ces documents. L'IA peut toujours suggérer des parcours, mais elle les inclura comme étapes suivantes requises dans votre plan."
            },
            ai: {
                title: "Configuration IA",
                description: "Par défaut, nous utilisons un module gratuit Gemini 2.5 Flash. Vous n'avez pas besoin de fournir de clé pour commencer. Si vous voulez un meilleur résultat, veuillez sélectionner votre modèle, ajouter votre clé API et cliquer sur Tester et Enregistrer.",
                freeAccess: "Accès gratuit par défaut",
                company: "Sélectionner l'entreprise IA",
                model: "Sélectionner le modèle",
                apiKeyLabel: "Clé API (Optionnel)",
                secureStorage: "Stockage local sécurisé",
                testButton: "Tester et enregistrer la configuration",
                verifying: "Vérification de la connexion...",
                working: "Le modèle fonctionne parfaitement !",
                testFailed: "Test échoué. Veuillez vérifier votre clé.",
                networkError: "Erreur réseau pendant le test.",
                autoFill: "Remplir automatiquement avec un profil exemple",
                placeholderGoogle: "AIza...",
                placeholderOpenAI: "sk-..."
            },
            review: {
                title: "Réviser votre profil",
                description: "Assurez-vous que tout est correct avant de générer vos parcours.",
                ready: "Prêt à découvrir vos parcours ?",
                clickGenerate: "Cliquer sur générer appellera l'IA en utilisant votre clé fournie."
            }
        },
        results: {
            generatedSuccess: "Parcours générés avec succès !",
            title: "Votre feuille de route",
            roadmap: "mondiale",
            description: "Notre IA a analysé votre profil et trouvé les options d'immigration les plus prometteuses adaptées spécifiquement à vos objectifs.",
            optionsCount: "Parcours",
            totalOptions: "Nombre total d'options",
            startOver: "Nouvelle recherche",
            exploreOptions: "Explorez vos options",
            verified: "Génération IA vérifiée",
            sources: "Sources officielles liées",
            backHome: "Retour à l'accueil",
            disclaimer: "Feuille de route générée par IA à titre informatif. Toujours recouper avec les portails de migration officiels.",
            quote: "Le voyage de mille lieues commence par ce pas.",
            copy: "Copier les résultats",
            export: "Télécharger PDF",
            save: "Enregistrer le parcours",
            pathway: {
                difficulty: "Difficulté",
                timeline: "Délai",
                cost: "Coût estimé",
                requirements: "Exigences",
                documents: "Documents nécessaires",
                steps: "Étapes de candidature",
                officialLinks: "Ressources officielles",
                warnings: "Avertissements importants",
                actions: "Actions recommandées",
                bestFor: "Idéal pour"
            }
        },
        privacyPage: {
            title: "Politique de confidentialité",
            lastUpdated: "Dernière mise à jour :",
            introTitle: "Votre confidentialité est notre priorité",
            introText: "Immigration Pathways est conçu avec une approche axée sur la confidentialité. Nous croyons que vos données personnelles et vos identifiants doivent rester sous votre contrôle à tout moment.",
            localKeyTitle: "Stockage local de la clé API",
            localKeyText: "Votre clé API IA est stockée uniquement dans le stockage local de votre navigateur. Nous ne l'envoyons jamais à nos serveurs.",
            noDbTitle: "Pas de base de données",
            noDbText: "Nous n'utilisons pas de base de données pour stocker vos informations de profil. Tout reste dans votre navigateur.",
            noTrackTitle: "Pas de suivi",
            noTrackText: "Nous ne suivons pas vos recherches spécifiques ni les parcours générés. Votre session est privée.",
            secureCallsTitle: "Appels IA sécurisés",
            secureCallsText: "Les appels API sont effectués en utilisant votre clé directement vers le fournisseur d'IA. Nous agissons uniquement comme un pont.",
            infoSectionTitle: "Informations que nous collectons",
            infoSectionText: "Les informations de profil que vous saisissez dans l'assistant (nationalité, âge, expérience professionnelle, etc.) sont traitées uniquement pour générer l'invite IA. Elles ne sont stockées nulle part en dehors de votre session locale.",
            aiUsageTitle: "Utilisation de l'IA",
            aiUsageText: "Lorsque vous utilisez cette application, vos données sont envoyées au fournisseur d'IA (par exemple, OpenAI) pour générer vos parcours. En utilisant votre propre clé API, vous êtes soumis à la politique de confidentialité et aux conditions d'utilisation de ce fournisseur."
        }
    },
    ar: {
        nav: {
            about: "حول",
            privacy: "الخصوصية",
            startNow: "ابدأ الآن",
        },
        hero: {
            new: "جديد: مسارات مدعومة بالذكاء الاصطناعي 2.0",
            title: "ابحث عن أفضل مسارات الهجرة لـ",
            profile: "ملفك الشخصي",
            description: "احصل على توجيه شخصي للانتقال إلى الخارج. سواء كنت ترغب في الدراسة أو العمل أو بدء عمل تجاري، يقوم ذكاؤنا الاصطناعي بتحليل ملفك الشخصي مقابل الفرص العالمية.",
            startSearch: "ابدأ بحثك",
            learnMore: "تعرف على المزيد",
            trusted: "موثوق به من قبل أكثر من 5000 مستكشف حول العالم",
        },
        howItWorks: {
            title: "ثلاث خطوات بسيطة نحو",
            future: "مستقبلك",
            description: "لقد قمنا بتبسيط عالم الهجرة المعقد إلى عملية واضحة وقابلة للتنفيذ.",
            step1: {
                title: "أكمل ملفك الشخصي",
                description: "أخبرنا عن تعليمك وتاريخك المهني وأهدافك من خلال معالجنا البديهي.",
            },
            step2: {
                title: "ربط مساعد الذكاء الاصطناعي",
                description: "قم بتوفير مفتاح API الخاص بك لمعالجة ملفك الشخصي بأمان. نحن لا نخزن بياناتك الحساسة أبدًا.",
            },
            step3: {
                title: "استلم خطتك",
                description: "احصل على 3-6 مسارات مخصصة مع روابط رسمية وتكاليف وتوجيهات خطوة بخطوة.",
            },
        },
        features: {
            title: "لماذا تثق في",
            aiGuidance: "توجيهاتنا الذكية؟",
            description: "الهجرة هي واحدة من أكبر قرارات الحياة التي ستتخذها. توفر أداتنا الوضوح في عالم من اللوائح المعقدة.",
            list: [
                "تحليل أكثر من 100 مسار هجرة عالمي في وقت واحد",
                "روابط مباشرة لبوابات التقديم الحكومية الرسمية",
                "تقديرات في الوقت الفعلي للتكاليف وأوقات المعالجة",
                "خصوصية بيانات بنسبة 100% مع تخزين محلي لمفتاح API",
            ],
            categories: {
                study: "الدراسة في الخارج",
                work: "تأشيرات العمل",
                nomad: "البدوالرقميون",
                startups: "الشركات الناشئة",
            },
        },
        cta: {
            title: "جاهز لإيجاد طريقك؟",
            description: "ابدأ رحلتك اليوم واكتشف المسار المناسب لك بتوجيه من ذكائنا الاصطناعي.",
            button: "ابدأ الآن",
            successStories: "عرض قصص النجاح",
        },
        footer: {
            about: "من نحن",
            privacy: "سياسة الخصوصية",
            terms: "شروط الخدمة",
            description: "تمكين المستكشفين العالميين من خلال خرائط طريق الهجرة المدعومة بالذكاء الاصطناعي. هدفنا هو جعل الانتقال إلى الخارج شفافًا وسهل الوصول ومنظمًا للجميع.",
            company: "الشركة",
            resources: "الموارد",
            start: "ابدأ التقييم",
            docs: "الوثائق",
            links: "روابط رسمية",
            built: "بني للاتصال العالمي.",
            secured: "بيانات مؤمنة محليًا"
        },
        wizard: {
            next: "التالي",
            back: "السابق",
            yes: "نعم",
            no: "لا",
            yearsLabel: "سنوات",
            generate: "إنشاء المسارات",
            generating: "جاري الإنشاء...",
            continue: "استمرار ومراجعة",
            steps: {
                basic: "معلومات أساسية",
                goal: "هدفك",
                education: "التعليم",
                work: "الخبرة العملية",
                preferences: "التفضيلات",
                documents: "المستندات",
                ai: "إعداد الذكاء الاصطناعي",
                review: "المراجعة"
            },
            basicInfo: {
                title: "لنبدأ بالأساسيات",
                description: "هذا يساعدنا في تصفية المسارات حسب أهليتك.",
                nationality: "بلد المواطنة",
                residence: "بلد الإقامة الحالي",
                age: "العمر",
                languages: "اللغات التي تتحدثها بطلاقة",
                languagesPlaceholder: "مثلاً: الإنجليزية، الفرنسية، الإسبانية"
            },
            goals: {
                title: "ما هو هدفك الأساسي؟",
                description: "اختر المسار الذي يتناسب تماماً مع نواياك.",
                study: {
                    title: "الدراسة في الخارج",
                    description: "شهادات، أبحاث، أو دورات لغة."
                },
                work: {
                    title: "تأشيرة عمل",
                    description: "توظيف، برامج العمال المهرة، أو رعاية."
                },
                both: {
                    title: "الدراسة والعمل",
                    description: "النظر في الفرص الأكاديمية والمهنية معاً."
                },
                business: {
                    title: "بدء مشروع / استثمار",
                    description: "تأشيرات الأعمال وبرامج ريادة الأعمال."
                },
                family: {
                    title: "لم شمل الأسرة",
                    description: "الانضمام إلى أفراد الأسرة المقيمين بالفعل في الخارج."
                },
                asylum: {
                    title: "اللجوء / الحماية",
                    description: "البحث عن حماية دولية (معلومات عامة فقط)."
                }
            },
            education: {
                title: "خلفيتك التعليمية",
                description: "أخبرنا عن أعلى مستوى تعليمي أكملته.",
                level: "أعلى درجة تعليمية حصلت عليها",
                field: "مجال الدراسة",
                fieldPlaceholder: "مثلاً: علوم الكمبيوتر، الطب، الفنون",
                gpa: "المعدل التراكمي (اختياري)",
                levels: {
                    highSchool: "الثانوية العامة",
                    bachelor: "درجة البكالوريوس",
                    master: "درجة الماجستير",
                    phd: "الدكتوراه"
                }
            },
            work: {
                title: "الخبرة المهنية",
                description: "يساعد تاريخ عملك في تحديد الأهلية للحصول على تأشيرة بناءً على المهارات.",
                titleLabel: "المسمى الوظيفي",
                titlePlaceholder: "مثلاً: مهندس برمجيات أول",
                years: "سنوات الخبرة",
                skills: "المهارات الأساسية (مفصولة بفاصلة)",
                skillsPlaceholder: "مثلاً: إدارة المشاريع، بايثون، المبيعات"
            },
            preferences: {
                title: "التفضيلات الشخصية",
                description: "ساعدنا في تحديد المواقع وأنماط انتقالك.",
                countries: "الدول المستهدفة",
                budget: "نطاق الميزانية",
                timeframe: "الجدول الزمني",
                willingToLearn: "هل أنت مستعد لتعلم لغة جديدة؟",
                languageNote: "هذا يوسع فرصك في العديد من الدول الأوروبية والآسيوية.",
                budgetLabels: {
                    low: "اقتصادي",
                    medium: "متوسط",
                    high: "مرتفع"
                },
                timeframeLabels: {
                    asap: "في أقرب وقت",
                    sixMonths: "خلال 6 أشهر",
                    oneYear: "سنة فأكثر"
                }
            },
            documents: {
                title: "قائمة جاهزية المستندات",
                description: "يساعد تحديد هذه المربعات الذكاء الاصطناعي على فهم مدى جاهزيتك الحالية وتقديم جداول زمنية أكثر دقة.",
                passport: "جواز سفر ساري المفعول",
                bankStatement: "إثبات الأموال (كشف حساب بنكي)",
                languageTest: "نتائج اختبار اللغة (IELTS، TOEFL، إلخ.)",
                degree: "الشهادات والدرجات العلمية",
                cv: "سيرة ذاتية مهنية محدثة",
                readinessNote: "لا تقلق إذا لم تكن تملك كل هذه المستندات بعد. لا يزال بإمكان الذكاء الاصطناعي اقتراح مسارات، ولكنه سيشمل هذه الخطوات كخطوات تالية مطلوبة في خطتك."
            },
            ai: {
                title: "إعداد الذكاء الاصطناعي",
                description: "افتراضياً، نستخدم وحدة Gemini 2.5 Flash مجانية. لست بحاجة لتقديم مفتاح للبدء. إذا كنت تريد مخرجات أفضل، يرجى اختيار الوحدة الخاصة بك، وإضافة مفتاح API، والنقر فوق اختبار وحفظ.",
                freeAccess: "وصول مجاني افتراضي",
                company: "اختر شركة الذكاء الاصطناعي",
                model: "اختر الموديل",
                apiKeyLabel: "مفتاح API (اختياري)",
                secureStorage: "تخزين محلي آمن",
                testButton: "اختبار وحفظ الإعدادات",
                verifying: "جاري التحقق من الاتصال...",
                working: "الموديل يعمل بشكل مثالي!",
                testFailed: "فشل الاختبار. يرجى التحقق من المفتاح.",
                networkError: "خطأ في الشبكة أثناء الاختبار.",
                autoFill: "تعبئة تلقائية بملف تعريف تجريبي",
                placeholderGoogle: "AIza...",
                placeholderOpenAI: "sk-..."
            },
            review: {
                title: "مراجعة ملفك الشخصي",
                description: "تأكد من أن كل شيء صحيح قبل إنشاء مساراتك.",
                ready: "جاهز لاكتشاف مساراتك؟",
                clickGenerate: "النقر فوق إنشاء سيستدعي الذكاء الاصطناعي باستخدام المفتاح المقدم."
            }
        },
        results: {
            generatedSuccess: "تم إنشاء المسارات بنجاح!",
            title: "خارطة طريقك",
            roadmap: "العالمية",
            description: "لقد قام ذكاؤنا الاصطناعي بتحليل ملفك الشخصي ووجد أكثر خيارات الهجرة واعدة والمصممة خصيصاً لأهدافك.",
            optionsCount: "مسارات",
            totalOptions: "إجمالي الخيارات",
            startOver: "بدء بحث جديد",
            exploreOptions: "استكشف خياراتك",
            verified: "إنشاء ذكاء اصطناعي موثق",
            sources: "روابط رسمية مرفقة",
            backHome: "العودة للرئيسية",
            disclaimer: "خارطة طريق منشأة بالذكاء الاصطناعي لأغراض إعلامية. يرجى دائماً المقارنة مع بوابات الهجرة الرسمية.",
            quote: "رحلة الألف ميل تبدأ بهذه الخطوة.",
            copy: "نسخ النتائج",
            export: "تحميل PDF",
            save: "حفظ المسار",
            pathway: {
                difficulty: "الصعوبة",
                timeline: "الجدول الزمني",
                cost: "التكلفة التقديرية",
                requirements: "المتطلبات",
                documents: "المستندات المطلوبة",
                steps: "خطوات التقديم",
                officialLinks: "الموارد الرسمية",
                warnings: "تحذيرات هامة",
                actions: "الإجراءات الموصى بها",
                bestFor: "الأفضل لـ"
            }
        },
        privacyPage: {
            title: "سياسة الخصوصية",
            lastUpdated: "آخر تحديث:",
            introTitle: "خصوصيتك هي أولويتنا",
            introText: "تم تصميم مسارات الهجرة بنهج يركز على الخصوصية أولاً. نحن نؤمن بأن بياناتك الشخصية وبيانات اعتمادك يجب أن تظل تحت سيطرتك في جميع الأوقات.",
            localKeyTitle: "تخزين مفتاح API محليًا",
            localKeyText: "يتم تخزين مفتاح API الخاص بالذكاء الاصطناعي في التخزين المحلي لمتصفحك فقط. نحن لا نرسله أبدًا إلى خوادمنا.",
            noDbTitle: "لا يوجد تخزين في قاعدة بيانات",
            noDbText: "لا نستخدم قاعدة بيانات لتخزين معلومات ملفك الشخصي. كل شيء يبقى في متصفحك.",
            noTrackTitle: "لا تتبع",
            noTrackText: "نحن لا نتتبع عمليات بحثك المحددة أو المسارات التي تم إنشاؤها. جلستك خاصة.",
            secureCallsTitle: "مكالمات ذكاء اصطناعي آمنة",
            secureCallsText: "تتم مكالمات API باستخدام مفتاحك مباشرة إلى مزود الذكاء الاصطناعي. نحن نعمل فقط كجسر.",
            infoSectionTitle: "المعلومات التي نجمعها",
            infoSectionText: "تتم معالجة معلومات الملف الشخصي التي تدخلها في المعالج (الجنسية، العمر، خبرة العمل، إلخ) فقط لإنشاء مطالبة الذكاء الاصطناعي. لا يتم تخزينها بشكل دائم في أي مكان خارج جلسة المتصفح المحلي الخاص بك.",
            aiUsageTitle: "استخدام الذكاء الاصطناعي",
            aiUsageText: "عند استخدام هذا التطبيق، يتم إرسال بياناتك إلى مزود الذكاء الاصطناعي (مثل OpenAI) لإنشاء مساراتك. باستخدام مفتاح API الخاص بك، فإنك تخضع لسياسة الخصوصية وشروط الخدمة الخاصة بذلك المزود."
        }
    }
};
