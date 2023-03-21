import { useMutation } from "@apollo/client";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { DEC_ACT } from "../Graphql/Mutations";
const useDecActUser = () => {
    const [errorDe, setErrorDe] = useState(null);
    const [getDecAct] = useMutation(DEC_ACT);
    const { logout } = useContext(AuthContext)
    let navigate = useNavigate()
    const onLogout = () => {
        logout()
        navigate('/login')
    }
    const handleDecActUser = (id) => {
        getDecAct({ variables: { id } })
            .then((data) => {
                if (data) {
                    onLogout()
                }
            })
            .catch((error) => {
                setErrorDe(error);
            });
    };
    return { handleDecActUser, errorDe };
};


const useForm = (callback, initialState = {}) => {
    const [values, setValues] = useState(initialState)
    const onChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    }

    const onSubmit = (event) => {
        event.preventDefault()
        callback()
    }

    return {
        onChange,
        onSubmit,
        values
    }
}


export { useForm, useDecActUser }