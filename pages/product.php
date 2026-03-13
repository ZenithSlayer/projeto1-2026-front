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
        <div class="wrapper">
            <div class="info">
                <img src="../imgs/rei.png" alt="">
                <div class="tags">
                    <li>Tag</li>
                    <li>Tag</li>
                    <li>Tag</li>
                    <li>Tag</li>
                    <li>Tag</li>
                </div>
            </div>
            <div class="details">
                <p class="title">Name of the product</p>
                <div class="wrapper">
                    <p class="subtitle">Guess what? subtitle here!</p>
                    <div class="stars">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star-half-stroke"></i>
                        <p>4.5/5</p>
                    </div>
                </div>
                <p class="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, quasi quos ipsam
                    odio rem labore, et dicta in rerum id aut tempore voluptatibus aspernatur dolorem magni
                    exercitationem deleniti non odit. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam
                    reprehenderit, eligendi eos autem id numquam officia voluptatum harum et, ipsam debitis nemo,
                    doloribus dolorum! Doloribus accusantium quisquam modi quibusdam eius?</p>
                <p class="price">$999.99</p>
            </div>
        </div>
    </main>
    <?php include('../includes/footer.php') ?>
</body>

</html>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;

        .wrapper {
            width: 80%;
            display: flex;
            flex-direction: row;
            gap: 20px;

            .info {
                height: fit-content;
                background-color: var(--dark-gray);
                padding: 10px;
                border-radius: 10px;
                flex: 1 1 40%;

                img {
                    margin: 0 0 10px 0;
                    width: 100%;
                    border-radius: 10px;
                }

                .tags {
                    list-style: none;
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    gap: 10px;

                    li {
                        color: white;
                        text-align: center;
                        padding: 10px 5px;
                        border-radius: 5px;
                        flex: 1 0 calc(33% - 20px);
                        background-color: var(--dark-cyan);
                        transition: all 1s;
                    }

                    li:hover {
                        z-index: 1;
                        box-shadow: inset 0 0 5px var(--light-cyan);
                        transform: scale(1.1);
                        transform-origin: bottom;
                        background-color: var(--default-cyan);
                        text-shadow: 0 0 10px white;
                    }
                }
            }

            .details {
                flex: 1 1 60%;
                font-size: 40px;

                .title {
                    font-weight: 600;
                    font-size: 1em;
                }

                .wrapper {
                    width: fit-content;

                    .subtitle {
                        font-size: .6em;
                        margin: 3px 0 10px 0;
                    }

                    .stars {
                        gap: 2px;
                        color: lightyellow;
                        text-shadow: 0 0 5px black;
                        display: flex;
                        align-items: center;
                        font-size: .6em;
                    }
                }

                .description {
                    color: var(--dark-gray);
                    font-size: .4em;
                }
            }
        }
    }
</style>