<template>
    <div id="corpo">
        <header>
            <nav class="nav-bar">
                <div class="logo"><img src="../assets/nome.png" alt="Logo"></div>
                <ul class="nav-links">
                    <li><a href="#quem-somos">Quem somos</a></li>
                    <li><a href="#servicos">Serviços</a></li>
                    <li><a href="#contato">Contato</a></li>
                    <RouterLink to="/login"><button class="button1">Login</button></RouterLink>
                </ul>
            </nav>
        </header>

        <div class="container">
            <div class="element1">
                <img src="../assets/girafas.png" alt="Descrição da imagem">
                <p>Seja bem-vindo(a)!</p>
            </div>
            <div class="element2">
                <div class="slider-container" ref="sliderContainer">
                    <div class="slider" :style="{ transform: `translateX(-${slideIndex * slideWidth}px)` }">
                        <img v-for="(image, index) in images" :key="index" :src="image.src" :alt="image.alt">
                    </div>
                    <button class="slider-btn prev-btn" @click="prevSlide">&lt;</button>
                    <button class="slider-btn next-btn" @click="nextSlide">&gt;</button>
                </div>
            </div>
        </div>

        <section id="quem-somos">
            <h1>Quem somos?</h1>
            <p>Nossa Clínica de Desenvolvimento Infantil oferece atendimento especializado com foco na Intervenção em
                ABA,
                promovendo melhorias no comportamento e na aprendizagem. Contamos com uma equipe multidisciplinar
                dedicada a
                garantir o desenvolvimento integral e o bem-estar das crianças e suas famílias. Acreditamos que cada
                criança
                é única e nosso compromisso é proporcionar um ambiente acolhedor, seguro e estimulante.</p>
        </section>

        <section id="servicos">
            <h1>Nossos serviços</h1>
        </section>

        <section id="contato">
            <h1>Contato</h1>
        </section>
    </div>
</template>
<style scoped>
#corpo {
    background-color: #E7FAFF;
    margin: 0;
    padding: 0;
}

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

.button1 {
    padding: 5px 40px;
    font-size: 17px;
    margin-left: 20px;
    background-color: #F5F5F5;
    border: none;
    border-radius: 20px;
    font-family: 'Montserrat', sans-serif;
    border: 1px solid #D9D9D9;
    color: #7E7E7E;
}

.button1:hover {
    background-color: #E7FAFF;
}

.container {
    display: flex;
    justify-content: space-evenly;
    margin-top: 55px;
}

.element1 {
    width: 500px;
    height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.element1 img {
    max-width: 370px;
    height: auto;
    margin-top: 5px;
}

.element1 p {
    margin-top: 20px;
    padding: 10px 85px;
    font-size: 16px;
    background-color: #FBE9EB;
    border: none;
    border-radius: 5px;
    font-family: 'Montserrat', sans-serif;
    border: 2px solid #FAC6CA;
}

.element2 {
    width: 800px;
    height: 500px;
    background-color: white;
    border-radius: 25px;
    overflow: hidden;
    position: relative;
}

.imggirafa {
    width: 50px;
    height: 50px;
}

.slider-container {
    position: relative;
}

.slider {
    display: flex;
    width: 4800px;
    transition: transform 0.5s ease;
}

.slider img {
    width: 800px;
    height: 500px;
    object-fit: cover;
}

.slider-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: #FBE9EB;
    border: none;
    color: #333;
    font-size: 24px;
    width: 50px;
    height: 50px;
    cursor: pointer;
    z-index: 10;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.prev-btn {
    left: 10px;
}

.next-btn {
    right: 10px;
}

section {
    max-width: 1200px;
    margin: 55px auto;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 25px;
    box-shadow: 0 4px 10px -1px rgba(0, 0, 0, 0.10);
    text-align: center;
    color: #FAC6CA;
}

section p {
    color: #7E7E7E;
    line-height: 1.9;
    font-size: 16px;
}

@media (max-width: 768px) {
    .nav-links li {
        display: none; 
    }

    .container {
        flex-direction: column;
    }
    
    .element1, .element2 {
        width: 100%; /* Usa toda a largura disponível */
    }

    .element1 img{
        width: 100%;
    }

    .element1 p{
        padding: 5px;
    }

    .slider img {
        width: 100%; /* Faz com que as imagens do slider ocupem toda a largura */
    }
    .logo img {
        width: 170px; /* Logo ainda menor em telas menores */
        margin-left: 10px; /* Diminua a margem à esquerda da logo */
    }

    .button1 {
        padding: 5px 20px; /* Ajuste adicional no preenchimento do botão */
        font-size: 14px; /* Ajuste adicional no tamanho da fonte do botão */
        margin-left: 2px;
    }

    .nav-links li {
        margin: 5px; /* Ajuste na margem dos itens de menu */
    }
}

</style>
<script>
import { RouterLink } from 'vue-router';
export default {
    data() {
        return {
            slideIndex: 0,
            slideWidth: 0,
            images: [
                { src: require('../assets/Frame1.png'), alt: 'Image 1' },
                { src: require('../assets/Frame2.png'), alt: 'Image 2' },
                { src: require('../assets/Frame3.png'), alt: 'Image 3' },
                { src: require('../assets/Frame4.png'), alt: 'Image 4' },
                { src: require('../assets/Frame5.png'), alt: 'Image 5' },
                { src: require('../assets/Frame6.png'), alt: 'Image 6' },
            ],
        };
    },
    mounted() {
        this.updateSlideWidth();
        window.addEventListener('resize', this.updateSlideWidth);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.updateSlideWidth);
    },
    methods: {
        updateSlideWidth() {
            if (this.$refs.sliderContainer) {
                this.slideWidth = this.$refs.sliderContainer.clientWidth;
            }
        },
        prevSlide() {
            this.slideIndex--;
            if (this.slideIndex < 0) {
                this.slideIndex = this.images.length - 1;
            }
        },
        nextSlide() {
            this.slideIndex++;
            if (this.slideIndex >= this.images.length) {
                this.slideIndex = 0;
            }
        },
    },
};
</script>
