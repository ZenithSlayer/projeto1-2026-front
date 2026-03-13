<div class="login">
    <div class="wrapper">
        <div class="decoration">
            <img src="../imgs/icon.png" alt="">
        </div>
        <form class="loginForm">
            <p class="title">Login</p>
            <div class="inputSection">
                <p>Email/Name</p>
                <input type="text" name="email" id="email">
            </div>
            <div class="inputSection">
                <p>Password</p>
                <input type="text" name="password" id="password">
            </div>
            <input class="submit" type="submit" value="Yeah, thats me">
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
                background-color: var(--light-cyan);
                width: 60px;
                height: align-items;
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
                display: flex;
                flex-direction: column;
                align-items: center;
                border-radius: 0 10px 10px 0;
                padding: 20px 40px;
                background-color: gray;

                .title {
                    text-align: center;
                    font-weight: bold;
                    font-size: 30px;
                    margin: 0 0 15px 0;
                }

                .inputSection {
                    margin: 0 0 10px 0;

                    p {
                        margin: 0 0 5px 0;
                        font-size: 1.3em;
                        font-weight: 500;
                        color: var(--dark-gray);
                    }

                    input {
                        font-size: 20px;
                        border: 0;
                        border-radius: 5px;
                        padding: 5px;
                    }
                }

                .submit {
                    margin: 10px 0;
                    border: none;
                    padding: 5px 0;
                    width: 80%;
                    border-radius: 5px;
                    background-color: var(--light-cyan);
                }
            }
        }
    }
</style>