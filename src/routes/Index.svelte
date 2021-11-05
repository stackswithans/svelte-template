<script lang="typescript">
    import { login, isAuthError } from "../lib/auth";

    let email: string;
    let password: string;
    let errors: string[] = [];

    const tryLogin = async () => {
        const email_regex = /^\w+@panorama.com$/;
        const password_regex = /^\w{8,}$/;
        if(!email_regex.test(email)){
            errors = ["Introduza um email válido"];
        }
        if(!password_regex.test(password)){
            errors = [...errors, "Introduza uma palavra-passe com pelo menos 8 caracteres"];
        }
        if(errors.length > 0){ return; }
        let loginResult =  await login(email, password);
        if (isAuthError(loginResult)){
            errors = ["Palavra-passe ou e-mail estão inválidos"];
            return;
        }
        //Navigate to next page
        //goto("/articles/");
    };
</script>

<svelte:head>
    <title>Overview - Panorama back office platform</title>
</svelte:head>

<main>
    <form>
        <header class="mb-2">
            <h4>Login</h4>
            <p class="mb-2">Use a sua conta de Administrador</p>
            <ul class="errors">
                {#each errors as error}
                    <li class="text-danger">{error}</li>
                {/each}
            </ul>
        </header>
        <div class="mb-3">
            <label for="emailInput" class="form-label"
                >Email</label
            >
            <input
                bind:value={email}
                type="email"
                class="form-control {(errors.length > 0)? 'is-invalid' : ''}"
                placeholder="nome@researcher.com"
                id="emailInput"
            />
        </div>
        <div class="mb-3">
            <label for="passwdInput" class="form-label"
                >Palavra-passe</label
            >
            <input
                bind:value={password}
                type="password"
                class="form-control {(errors.length > 0)? 'is-invalid' : ''}"
                placeholder="palavra-passe"
                id="passwdInput"
            />
        </div>
        <div class="form-footer">
            <button on:click={tryLogin} type="button" class="btn btn-primary">Entrar</button>
        </div>
    </form>
</main>

<style>
    .form-footer{
        display: flex;
        width: 100%;
        justify-content: flex-end;
    }

    main {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
        width: 100%;
        height: 100vh;
    }

    form {
        padding: 2rem 2rem 2rem 2rem;
        border: 1px solid #d3d3d3;
        border-radius: 0.3rem;
    }

    form header{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        justify-content: center;
    }

    form header > * {
        width: fit-content;
    }
</style>
