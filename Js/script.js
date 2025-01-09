const form = document.getElementById('registrationForm');
const responseMessage = document.getElementById('responseMessage');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const fileInput = document.getElementById('archivo');
    const file = fileInput.files[0];

    let fileUrl = 'Sin archivo adjunto';

    if (file) {
        fileUrl = await uploadFileToFirebase(file);
    }

    const data = {
        nombre: formData.get('nombre'),
        pais: formData.get('pais'),
        fecha_nacimiento: formData.get('fecha_nacimiento'),
        whatsApp: formData.get('whatsApp'),
        email: formData.get('email'),
        binance_de_Pay: formData.get('binance_de_Pay'),
        archivoUrl: fileUrl, // Enlace al archivo
    };

    try {
        const response = await fetch('https://api.sheetbest.com/sheets/aec485a2-66a4-46c7-add5-2fe4cf4d3d3e', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            responseMessage.textContent = 'Datos enviados correctamente!';
            responseMessage.style.color = 'green';
            form.reset();
        } else {
            responseMessage.textContent = 'Error al enviar los datos.';
            responseMessage.style.color = 'red';
        }
    } catch (error) {
        responseMessage.textContent = 'Error al conectar con el servidor.';
        responseMessage.style.color = 'red';
    }
});

async function uploadFileToFirebase(file) {
    // Ejemplo de configuración para Firebase
    const firebaseConfig = {
        apiKey: "REGISTRACION",
        authDomain: "REGISTRACION",
        projectId: "REGISTRACION",
        storageBucket: "REGISTRACION",
        messagingSenderId: "REGISTRACION",
        appId: "REGISTRACION",
    };

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(`uploads/${file.name}`);
    await fileRef.put(file);
    return await fileRef.getDownloadURL();
}
