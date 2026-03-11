<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>search</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/search.css">
    <script src="https://kit.fontawesome.com/3c1e3bba41.js" crossorigin="anonymous"></script>
</head>

<body>
    <?php include('../includes/header.php') ?>
    <main>
        <ul>
            <?php for ($i = 0; $i < 8; $i++) {
                echo '<li>
                <div class="cart">
                    <i class="fa-solid fa-cart-shopping"></i>
                </div> 
                <img src="../imgs/rei.png" alt="">
                <p class="title">Rei Plush</p>
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