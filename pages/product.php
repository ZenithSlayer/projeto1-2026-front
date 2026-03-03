<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Product</title>
</head>
<body>
    <?php include('../includes/header.php') ?>
    <main>
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
        <div>

        </div>
    </main>
    <?php include('../includes/footer.php') ?>
</body>
</html>

<style>
    *{
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }
    body {
        width: 100%;
    }
    main {
        min-height: 100vh;
    }
    .imgTags {
        width: calc(100vw / 4);
        img {
            width: 100%;
        }
        .tags {
            display: flexbox;
            grid-template-rows: auto auto auto;
            li {
                width: fit-content;
                list-style: none;
                padding: 10px 20px;
                background-color: black;
                color: white;
            }
        }
    } 
</style>