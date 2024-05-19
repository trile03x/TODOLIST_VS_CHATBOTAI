document.getElementById('form').addEventListener('submit', async function (event) {
  event.preventDefault();
  const username = document.getElementById('username-input').value;
  const password = document.getElementById('password-input').value;
  localStorage.setItem('emailUser',username);
  try {
    const response = await axios.post('http://localhost:3036/api/v1/users/login', {
      email: username,
      pass: password
    },
    );
    if (response.status === 200) {
      alert('Login successful!');
      localStorage.setItem('token', response.data.token);
      // document.cookie = `token=${response.data.token}; path=/; secure`;
      window.location.href = '/FE/index.html';
    } else {
      alert('Login failed: ');
    }
  } catch (error) {
    if (error.response) {
      alert('Login failed');
    } else {
      console.error('Error:', error);
      alert('Login failed: An unexpected error occurred.');
    }
  }
  console.log(username);
  console.log(password);
});
