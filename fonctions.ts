import axios from 'axios';




interface User {
  user: string;
  secret:string;
  Level:number;
  Point:number;
  
}

const ilyane: User = {
  user: 'Ilyane',
  secret:'',
  Level:0,
  Point:0,
};

function setLevel(user: User, level: number): void {
  user.Level = level;
}

function setPoint(user: User, point: number): void {
  user.Point = point;
}


const ip_address = '10.33.2.123';
const start_port = 1024;
const end_port = 4096;
const concurrency = 3068; // Nombre de requêtes en parallèle
const counter =0;

async function pingPort(ip: string, port: number) {
  const url = `http://${ip}:${port}/ping`;

  try {
    const response = await axios.get(url);
    console.log(`Le port ${port} a répondu avec le statut ${response.status}`);
    signupUser(ip_address, port, 'Ilyane');

    
    return port;
  } catch (error) {
    return null;
  }
}

async function findOpenPorts(ip: string, startPort: number, endPort: number) {
  const openPorts: number[] = [];
  const promises: Promise<number | null>[] = [];

  for (let port = startPort; port <= endPort; port++) {
    console.log(`Test du port ${port}...`);
    promises.push(pingPort(ip, port));

    if (promises.length === concurrency || port === endPort) {
      const results = await Promise.all(promises);
      openPorts.push(...results.filter((port) => port !== null) as number[]);
      promises.length = 0; // Réinitialiser les promesses
    }
  }

  return openPorts;
}

findOpenPorts(ip_address, start_port, end_port);



async function signupUser(ip: string, port: number, user: string) {
  const url = `http://${ip}:${port}/signup`;
  const data = { User: user };

  try {
    const response = await axios.post(url, data);
    console.log('Inscription réussie !');
    await fetchSecret(ip_address, port, 'Ilyane');

    console.log('Réponse du serveur :', response.data);
  } catch (error) {
    console.error('Erreur lors de l\'inscription :', error);
  }
}



async function fetchSecret(ip: string, port: number, user: string) {
  const url = `http://${ip}:${port}/secret`;
  const data = { User: user };
  

  try {
    const response = await axios.post(url, data);
    console.log('Secret récupéré !');
    console.log('', response.data.split(' ')[2].trim());

    ilyane.secret = response.data.split(' ')[2].trim(); // Mettre à jour la propriété 'secret' de l'objet 'user'



    
    await getUserPoints(ip_address, port, 'Ilyane',ilyane.secret);
  } catch (error) {
    console.error('Erreur lors de la récupération du secret :', error);
  }
}

async function getLevel(ip: string, port: number, user: string,secret:string) {
  const url = `http://${ip}:${port}/getLevel`;
  const data = { User: user,Secret:secret };

  try {
    const response = await axios.post(url, data);
   
    console.log('', response.data);
    const test = parseInt(response.data.split(' ')[1]);
    setLevel(ilyane,test+1);
    console.log(ilyane.Level);

    
    await submitChallenge(ip_address, port, 'Ilyane',ilyane.secret);

  } catch (error) {
    console.error('Erreur lors de la récupération des levels :', error);
  }
}

async function getUserPoints(ip: string, port: number, user: string,secret:string) {
  const url = `http://${ip}:${port}/getUserPoints`;
  const data = { User: user,Secret:secret };
  
  

  try {
    const response = await axios.post(url, data);
    console.log('Voici les Puntos: ');
    console.log('', response.data);
    const test = parseInt(response.data.split('\n')[1]);
    setPoint(ilyane,test-1);
    console.log(ilyane.Point);
   
    

    
    console.log(ilyane.Point);

    await getLevel(ip_address, port, 'Ilyane',ilyane.secret);
  } catch (error) {
    console.error('Erreur lors de la récupération des points :', error);
  }
}

async function getChallenge(ip: string, port: number, user: string,secret:string) {
  const url = `http://${ip}:${port}/getChallenge`;
  const data = { User: user,Secret:secret };

  try {
    const response = await axios.post(url, data);
    console.log('Le challenge ');
    console.log('Challenge :', response.data);
    //await submitChallenge(ip_address, port, 'Ilyane',ilyane.secret);
  } catch (error) {
    console.error('Erreur lors de la récupération des points :', error);
  }
}


async function submitChallenge(ip: string, port: number, user: string,secret:string) {
  
  
  const url = `http://${ip}:${port}/submitChallenge`;
    const data = { 
      User: user,
      Secret:secret,
      Content :{
        Level:ilyane.Level,
        Challenge : {

          Username:user,
          Secret: secret,
          Points: ilyane.Point,

        },
        Protocol :"SHA-1",
        SecretKey:"Il n'y a que les imbéciles qui ne changent pas d'avis."

      }
  };

  try {
    const response = await axios.post(url, data);
    
    console.log('--------', response.data);
  } catch (error) {
    console.error('Erreur lors de la récupération des points :', error);
  }
}


