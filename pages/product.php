<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Product</title>
    <link rel="stylesheet" href="css/product.css">
</head>

<body>
    <?php include('../includes/header.php') ?>
    <main>
        <div class="product">
            <div class="imgTags">
                <img src="../imgs/rei.png" alt="">
                <ul class="tags">
                    <li>tag</li>
                    <li>tag</li>
                    <li>tag</li>
                    <li>tag</li>
                    <li>tag long</li>
                </ul>
            </div>
            <div class="info">
                <h1>Titulo foda</h1>
                <div>
                    <h2>subtitulo</h2>
                    <ul class="stars">
                        <li>⭐</li>
                        <li>⭐</li>
                        <li>⭐</li>
                        <li>⭐</li>
                        <li>⭐</li>
                    </ul>
                </div>
                <details>
                    <summary>Description</summary>
                    <h3>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum minima illum sit aspernatur,
                        optio unde officia reiciendis, tempore nulla animi praesentium assumenda quisquam voluptatum
                        quam est repudiandae atque magnam similique. Lorem, ipsum dolor. Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. Ab officia assumenda corrupti provident asperiores ipsa rem fugiat
                    </h3>
                </details>
                <div class="priceQuantity">
                    <h1>R$999,99</h1>
                    <div>
                        <p>-</p>
                        <input type="number" min="1">
                        <p>+</p>
                    </div>
                </div>
                <div class="buyCart">
                    <p class="buy">Buy</p>
                    <p class="cart">Send to cart</p>
                </div>
            </div>
        </div>
    </main>
    <?php include('../includes/footer.php') ?>
</body>

</html>