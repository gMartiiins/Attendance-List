//Para usar o ESTADO importar useState
//Hooks
import React, { useState, useEffect } from 'react';
import './styles.css';

import { Card, CardProps } from '../../componentes/Card';

//TypeScript TYPE
type ProfileResponse = {
  name: string;
  avatar_url: string;
}

type User = {
  name: string;
  avatar: string;
}

export function Home() {
  //guardar o conteudo do estado (studentName)
  //Funcao que atualizara o estado (setStudentName)
  const [studentName, setStudentName] = useState('');

  //armazenar o nomes dos que serao adicionados
  //colocando typeScript<CardProps[]>
  const [students, setStudents] = useState<CardProps[]>([]);
  //Colando TypeScript<user>
  const [user, setUser] = useState<User>({} as User);

  //Funcao para dicionar os alunos com o tempo
  function handleAddStudent(){
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br",{
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    };
    //atualizar a lista de estudantes adicionados
    //adicionar a constante criada(newStudent) no setStudents
    //criar um novo valor e manter oq ja tinha (...prevState)
    setStudents(prevState =>[...prevState, newStudent]);
  }
  //useEffect = executado automaticamente
  //usando useEffects para consumir api (no caso eu puxei a minha do github)
  // useEffect(() => {
  //   //corpo do useEffect = todas as acoes que eu quero que execute
  //   fetch('https://api.github.com/users/gmartiiins')
  //   .then(response => response.json())
  //   .then(data =>{
  //     setUser({
  //       name:data.name,
  //       avatar: data.avatar_url
  //     })
  //   })
  // }, [])

  //Usando useEfects Async
  //Add TypeScript as ProfileResponse
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://api.github.com/users/gmartiiins');
      const data = await response.json() as ProfileResponse;

      setUser({
        name: data.name,
        avatar: data.avatar_url,
      });
    }

    fetchData();
  }, []);

  return (
    <div className='container'> 
      <header>
        <h1>Lista de Presença</h1>
      <div>
        <strong>{user.name}</strong>
        <img src={user.avatar} alt='foto de perfil'/>
      </div>
      </header>
      

      <input type="text" 
      placeholder="Digite o nome..."
      //toda vez que mudar o valor do input ele salva (onchage)
      //ao clicar no botao acionar a funcao(handleaddstudent)
      onChange = { e => setStudentName(e.target.value)}
      />
      
      <button type="button" onClick={handleAddStudent}>
        Adicionar
        </button>
      {
        
        //map = percorre cada item da lista
        students.map(student => (
        <Card 
        //chave unica pra nao aparecer erro (key)
        key={student.time}
        name={student.name} 
        time={student.time} 
        />
        ))
      
        }
    </div>
  )
}
