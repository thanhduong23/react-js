import React from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


const schema = yup.object().shape({
  username: yup.string().required('Nhập dữ liệu').min(5, 'Tên đăng nhập phải có 5 kí tự trở lên').max(80, 'Username không được quá 80 kí tự'),
  password: yup.string().required('Nhập password').min(6, 'Password phải có 6 kí tự trở lên').max(20, 'Password không được quá 20 kí tự'),
});

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    axios.post(process.env.REACT_APP_URL, data)
    .then((response)=>{
        console.log(response.data.firstName)
        alert(response.data.firstName);
    })
    .catch((error) => {
      console.log(error);
    })
  };
  
  return (
    <Helmet title="Login">
      <CommonSection title="Login" />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12" className="m-auto text-center">
              <form className="form mb-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="form__group">
                
                  <input  placeholder='Nhập username' type="text" {...register('username')} />
                </div>
                <div className="form__group">
                  
                  <input  placeholder='Nhập password' type="password" {...register('password')} />
                </div>
                <button type="submit" className="addTOCart__btn">
                <Link to="/home">Lo</Link>gin
                </button>
              </form>
              <Link to="/register">
                Don't have an account? Create an account
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
