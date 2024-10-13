<template>
    <header>
      <nav class="nav-bar">
          <div class="logo"><img src="../assets/nome.png" alt="Logo"></div>
          <!-- <ul class="nav-links">
              <li><a href="">Sua agenda</a></li>
              <li><a href="">Evolução</a></li>
              <li><a href="">Historico de consultas</a></li>
          </ul>-->
      </nav>
  </header>
</template>
<style>
.nav-bar {
    background-color: white;
    color: #ffffff;
    width: 100%;
    margin: 0 auto;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 4px 10px -1px rgba(0, 0, 0, 0.10);
}

.logo img {
    width: 250px;
    margin-left: 25px;
}

.nav-links {
    list-style: none;
    display: flex;
    margin-right: 60px;
    align-items: center;
}

.nav-links li {
    margin: 15px;
    padding: 5px 25px;
    display: flex;
    align-items: center;
    border-radius: 20px;
    border: 1px solid #84E7FF;
}

.nav-links a {
    text-decoration: none;
    color: #7E7E7E;
    font-size: 17px;
    display: flex;
    align-items: center;
}

.nav-links a:hover {
    color: #84E7FF;
}

</style>