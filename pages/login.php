<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>login</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/login.css">
    <script src="https://kit.fontawesome.com/3c1e3bba41.js" crossorigin="anonymous"></script>
</head>

<body>
    <?php include('../includes/header.php') ?>
    <main>
        <div class="blackout">
            <div class="outBox">
                <div class="decor">
                    <img src="../imgs/icon.png" alt="">
                </div>
                <div class="content">
                    <p class="title">Login</p>
                    <div class="info">
                        <div class="input">
                            <p>email</p>
                            <input type="text" name="email" id="email">
                        </div>
                        <div class="input">
                            <p>password</p>
                            <input type="text" name="password" id="password">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <?php include('../includes/footer.php') ?>
</body>

</html>

<style>
    main {
        .blackout {
            background-color: #000000c0;
            position: absolute;
            height: 100%;
            width: 100%;
            right: 0;
            z-index: 998;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .outBox {
            display: flex;
            align-items: center;
            justify-content: center;
            max-width: 500px;
            max-height: 500px;
            align-items: stretch; /* important */
        }
        
        .decor {
            z-index: 1;
            background-color: #35b5af;
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
            padding: 20px 0;
            width: 250px;
            border-radius: 0 10px 10px 0;
            right: calc(100vw / 2);
            background-color: gray;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        .title {
            font-size: 30px;
        }
    }
</style>