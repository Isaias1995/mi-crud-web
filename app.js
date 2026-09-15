// Configuración de Firebase (usa tus propias claves desde Firebase Console)
  const firebaseConfig = {
    apiKey: "AIzaSyCUrpllv8QFquxYCSexgLAm6_68Ccl1KlQ",
    authDomain: "crudweb-e31d1.firebaseapp.com",
    projectId: "crudweb-e31d1",
    storageBucket: "crudweb-e31d1.firebasestorage.app",
    messagingSenderId: "372985966993",
    appId: "1:372985966993:web:4e937790aa592406602a30",
    measurementId: "G-8SBQSS0RXX"
  };

// Inicializar Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Referencias
const form = document.getElementById("form");
const lista = document.getElementById("lista");

// Crear
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;

  await db.collection("usuario").add({ nombre, email });
  form.reset();
});

// Leer en tiempo real
db.collection("usuario").onSnapshot(snapshot => {
  lista.innerHTML = "";
  snapshot.forEach(doc => {
    const li = document.createElement("li");
    li.textContent = `${doc.data().nombre} - ${doc.data().email}`;
    
    // Botón borrar
    const btn = document.createElement("button");
    btn.textContent = "Eliminar";
    btn.onclick = () => db.collection("usuario").doc(doc.id).delete();
    
    li.appendChild(btn);
    lista.appendChild(li);
  });
});
