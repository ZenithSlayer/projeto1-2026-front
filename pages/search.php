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

            <li>
                <img src="../imgs/rei.png" alt="">
                <p>Nome do produto</p>
                <div>
                <p>R$999,99</p>
                <div>
                    <p>stock left:</p>
                    <p>number!</p>
                </div>
                </div>
            </li>

            <?php for ($i = 0; $i < 4; $i++) {
                echo '';
            }
            ?>
        </ul>
    </main>
    <?php include('../includes/footer.php') ?>
</body>

</html>

<style>
    
</style>