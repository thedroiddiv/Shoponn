import { ButtonVariant } from "react-bootstrap/esm/types"

export const getTheme = (isDarkMode: boolean): ApplicationTheme => (isDarkMode ? DarkTheme : LightTheme)

type ApplicationTheme = {
    bootstrap: {
        backgroundColor: string,
        backgroundColorSec:string
        textColor: string,
        topBarColor:string,
        cartBtnVarient:string,
        cardBackground:string,
        outlineBtnVarient:"secondary" | "light"
        cardBtnVarient:string,



        topBarVarient:"light" | "dark",
        topBarText:string,
        selectedTabColor:string,

        productCard : {
            btnVarient:ButtonVariant,
            btnTextColor:string,
            titleColor:string,
            bgColor:string,
            borderColor:string
        }

        footer: {
            bgColor:string,
            textColor:string,
            secondaryColor:string
        }
    }
}

const DarkTheme: ApplicationTheme =
{
    bootstrap: {
        backgroundColor: "dark-bg",
        backgroundColorSec:"bg-dark",
        textColor: "text-light",
        topBarColor:"dark",
        topBarVarient:"dark",
        topBarText:"text-light",
        selectedTabColor:"text-warning",
        cartBtnVarient:"outline-warning",
        cardBackground:"bg-dark",
        outlineBtnVarient:"light",
        cardBtnVarient:"warning",



        productCard : {
            btnVarient:"warning",
            btnTextColor:"text-dark",
            titleColor:"text-light",
            bgColor:"dark",
            borderColor:"dark"
        },


        footer: {
            bgColor:"bg-dark",
            textColor:"text-light",
            secondaryColor:"text-muted"
        },

        
    }
}

const LightTheme: ApplicationTheme =
{
    bootstrap: {
        backgroundColor: "bg-light",
        backgroundColorSec:"bg-white",
        textColor: "text-dark",
        topBarColor:"light",
        topBarVarient:"light",
        topBarText:"text-secondary",
        selectedTabColor:"text-primary",
        cartBtnVarient:"primary",
        cardBackground:"bg-white",
        cardBtnVarient:"primary",

        outlineBtnVarient:"secondary",
        

        productCard : {
            btnVarient:"warning",
            btnTextColor:"text-dark",
            titleColor:"text-dark",
            bgColor:"light",
            borderColor:"light"

        },

        footer: {
            bgColor:"bg-light",
            textColor:"text-dark",
            secondaryColor:"text-muted"
        }
    }
}