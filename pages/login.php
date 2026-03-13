<div class="login">
    <div class="wrapper">
        <div class="decoration">
            <img src="../imgs/icon.png" alt="">
        </div>
        <form class="loginForm">

        </form>
    </div>
</div>

<style>
    body {
        overflow: hidden;
    }

    .login {
        position: fixed;
        top: 0;
        height: 100vh;
        width: 100vw;
        background-color: rgb(0, 0, 0, .7);
        z-index: 999;
        display: flex;
        justify-content: center;
        align-items: center;

        .wrapper {
            height: fit-content;
            width: fit-content;
            display: flex;
            flex-direction: row;

            .decoration {
                background-color: rgb(53 181 175);
                width: 60px;
                height: 300px;
                display: flex;
                justify-content: center;
                align-items: end;
                box-shadow: 5px 0 0 red;
                border-radius: 10px 0 0 10px;
                z-index: 1;

                img {
                    margin: 0 0 5px 0;
                    object-fit: scale-down;
                    width: 80%;
                }
            }

            .loginForm {
                width: 200px;
                background-color: gray;
            }
        }
    }
</style>