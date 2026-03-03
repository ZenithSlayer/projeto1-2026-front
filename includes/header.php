<header>
    <ul>
        <a href="carai">Link 1</a>
        <a href="carai">Link long 2</a>
        <a href="carai">Link 3</a>
    </ul>
    <img class="logo" src="../imgs/rei.png" alt="">
    <ul>
        <a href="carai">Link 1</a>
        <a href="carai">Link long 2</a>
        <img class="accountLogo" src="../imgs/rei.png" alt="">
    </ul>
</header>

<style>
    :root {
        --header-height: 100px;
    }
    header {
        position: sticky;
        top: 0;
        background-color: black;
        width: 100vw;
        height: var(--header-height);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0 30px;
        ul {
            gap: 20px;
            display: flex;
            align-items: center;
        }
        a {
            color: white;
        }
        .logo {
            height: calc(var(--header-height) / 1.2);
            width: calc(var(--header-height) * 2);
        }
        .accountLogo {
            height: calc(var(--header-height) / 1.5);
            border-radius: 50%;
        }
    }
</style>