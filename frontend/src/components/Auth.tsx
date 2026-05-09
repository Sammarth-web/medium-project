
// making interfcaes
// input ka components alag se
// passing dynaliv values
// spread opertaors... object use case

import { useState } from "react"
import { Link } from "react-router-dom"
import { type SignupInput } from "@sammarthdev/medium-common-1"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../config"


function Auth( { type }: { type: "signup" | "signin" }) {

    const navigate = useNavigate()

    //define statevaribles here
    const[ postInputs , setPostInputs ] = useState<SignupInput>({
        username : "",
        password : ""
    })


    // handle button on click
    // if signup -> send /signup endpoint assign token into cookies and route to blogs.
    // if signin -> send /signin , store token into cookies , route to blogs

    // how to send iputs to button with types
    async function sendRequest () {
        try{
            console.log("Api Hit ")
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}` , postInputs )
            const jwt = response.data.jwt

            console.log("Response ==>",response)
            
            //store to local storage
            localStorage.setItem("token" , jwt)
            navigate("/blogs")

        }catch(e){
            // alert user here
            alert(e)
            console.log(e)
        }
        
    }


    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
                
                <div className="px-10">
                    <div className="text-3xl font-extrabold">
                      {type === "signin" ? "Sign In to your account" : "Create your account"}
                    </div>

                    <div className="text-slate-500">
                        {type === "signin" ? "Don't have an account?" : "Already have an account?" }
                        <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>
                            {type === "signin" ? "Sign up" : "Sign in"}
                        </Link>
                    </div>
                </div>
                
                <div className="space-y-4">
                    <LabelledInput label="username" placeholder="user@gmail.com" onChange={ (e) => {
                        setPostInputs({
                            ...postInputs,
                            username : e.target.value
                        })
                    }}/>

                    <LabelledInput label="password" type="password" placeholder="password" onChange={ (e) => {
                        setPostInputs({
                            ...postInputs,
                            password : e.target.value
                        })
                    }}/>
                    
                    <button onClick={sendRequest} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Sign up" : "Sign in"}</button>
                </div>
            </div>
        </div>
    </div>
}

interface LabelledInputs {
    label: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput( { label , placeholder , onChange , type} : LabelledInputs ) {
    return(
        <div>
            <label className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>
            <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />

        </div>
    )
}


export default Auth