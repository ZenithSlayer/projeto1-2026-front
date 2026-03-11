<div class="blackout">
    <div class="outBox">
        <div class="decor">
            <img src="../imgs/icon.png" alt="">
        </div>
        <div class="content">
            <p class="title">Login</p>
            <form class="info">
                <div class="userInput">
                    <p>email</p>
                    <input type="text" name="email" id="email">
                </div>
                <div class="userInput">
                    <p>password</p>
                    <input type="text" name="password" id="password">
                </div>
                <input class="submit" type="submit" value="Login">
            </form>
        </div>
    </div>
</div>

<style>
    .blackout {
        background-color: rgb(0, 0, 0, 0.5);
        position: absolute;
        height: 100%;
        width: 100%;
        right: 0;
        z-index: 998;

        .outBox {
            position: fixed;
            right: 50%;
            top: 50%;
            transform: translate(50%, -50%);
            display: flex;
            align-items: center;
            justify-content: center;
            max-width: 500px;
            max-height: 500px;
            align-items: stretch
        }

        .decor {
            z-index: 1;
            background-color: rgb(20, 194, 189);
            width: 70px;
            box-shadow: red 5px 0 0;
            border-radius: 10px 0 0 10px;
            position: relative;

            img {
                width: 50px;
                position: absolute;
                bottom: 10px;
                right: .5em;
            }
        }

        .content {
            padding: 10px 40px 40px 40px;
            border-radius: 0 10px 10px 0;
            right: calc(100vw / 2);
            background-color: gray;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 20px;
        }

        .title {
            font-size: 30px;
            font-weight: bold;
        }

        .userInput {
            p {
                font-size: 17px;
                text-transform: capitalize;
                color: rgb(30, 30, 30);
            }

            input {
                padding: 7px;
                border-radius: 10px;
                font-size: 20px;
                border-style: none;
            }
        }

        .info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 20px;
        }

        .submit {
            border-style: none;
            background-color: rgb(20, 194, 189);
            border-radius: 5px;
            width: 100%;
            font-size: 14px;
            padding: 10px 0;
        }
    }
</style>