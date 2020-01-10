<script>
    import { onMount } from 'svelte';
    import { getLikes } from '../data/apiUtility';

    let likecounter = -1;

    onMount(() => {
        renderLikes();
    });

    const renderLikes = () => {
        getLikes()
            .then(likes => {
                likecounter = likes.payload;
            })
            .catch(err => {
                likecounter = err.message;
            });

        setTimeout(renderLikes, 5000);
    };
</script>


<style>
</style>


<h1>have you liked us on facebook yet?</h1>

<div class="likes">
    <p id="likecounter">{likecounter}</p>
    <i class="far fa-thumbs-up"></i> 
</div>

<h3>go to facebook.com/lostfromthestartband and give us a like!</h3>