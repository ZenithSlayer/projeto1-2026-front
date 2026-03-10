<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Product</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/product.css">
    <script src="https://kit.fontawesome.com/3c1e3bba41.js" crossorigin="anonymous"></script>
</head>

<body>
    <?php include('../includes/header.php') ?>
    <main>
        <ul>
            <?php for ($i = 0; $i < 8; $i++) {
                echo '<li>
                <div class="cart">
                    <i class="fa-solid fa-cart-plus"></i>
                </div> 
                <img src="../imgs/rei.png" alt="">
                <p class="title">Product name</p>
                <p class="price">$999,99</p>
                <div class="stock">
                    <p>stock: </p>
                    <p>50</p>
                </div>
            </li>';
            }
            ?>
        </ul>
    </main>
    <?php include('../includes/footer.php') ?>
</body>

</html>

<style>
    main {
        ul {
            width: 85%;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            flex-wrap: wrap;
            gap: 20px;
        }

        li {
            flex: 0 0 20%;
            box-sizing: border-box;
            min-width: 200px;
            width: 20vw;
            list-style: none;
            background-color: #0b827e;
            padding: 20px;
            padding-bottom: 30px;
            border-radius: 20px;
            position: relative;

            img {
                max-width: 100%;
                margin-bottom: 10px;
                border-radius: 10px;
            }

            .details {
                display: flex;
                flex-direction: row;
                justify-content: space-between;

            }

            .stock {
                color: #363636ff;
                position: absolute;
                display: flex;
                flex-direction: row;
                right: 15px;
                bottom: 10px;
            }

            .price {
                text-align: center;
            }
        }

        .title {
            font-size: clamp(15px, 2vw, 19px);
            ;
            text-align: center;
            font-weight: bold;
            margin-bottom: 10px;
        }

        .cart {
            opacity: 0;
            background-color: orangered;
            position: absolute;
            padding: 5px;
            right: 25px;
            top: 25px;
            border-radius: 5px;
            transition: opacity .5s ease-in;
        }

        li:hover{
            transform: translateY(-10px);
            .cart {
                opacity: 100;
            }
        } 
    }
</style>