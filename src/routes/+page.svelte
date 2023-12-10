<script lang="ts">
    let eventCode = '';
    let matchCode = '';
    let match = false;
    let event = false;
    import type { Match } from '$lib/types';
    import Card1 from './Card1.svelte';
    import Card2 from './Card2.svelte';
    import Card3 from './Card3.svelte';
    import Button from './Button.svelte';
    import Button2 from './Button2.svelte';
    let btnDisabled = false;
    let matchData = getMatchStats();
    let eventData = getEventStats();


    async function getEventStats(): Promise<Match[]> {
        const res = await fetch(`https://api.statbotics.io/v2/matches/event/${eventCode}`);
        // if (!res.ok) throw Error(`Error: ${res.status} - ${res.statusText}`);
        const data = await res.json();
        return data;
    }


    function wantMatch() {
        match = true;
        event = false;
    }


    function wantEvent() {
        console.log("wantsEvent")
        match = false;
        event = true;
    } 


    async function getMatchStats(): Promise<Match> {
        const res = await fetch(`https://api.statbotics.io/v2/match/${matchCode}`);
        // if (!res.ok) throw Error(`Error: ${res.status} - ${res.statusText}`);
        const data = await res.json();
        return data;
    }
</script>



<div class="header">

    <!--Content before waves-->
    <div class="inner-header flex">
  
    <h1><b>FRC Event Statistics</b></h1>
    </div>
    
    <!--Waves Container-->
    <div>
    <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
    <defs>
    <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
    </defs>
    <g class="parallax">
    <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
    <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
    <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
    <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff" />
    </g>
    </svg>
    </div>
    <!--Waves end-->
    
    </div>


<Card2>
<center>
<br>
<span style="color: white; text-align: center; width: 100%; font-size: 40px" >What Would You Like To Display: </span><br>
<br>
<Button disabled={btnDisabled} on:click={wantMatch}>A Single Match</Button>
<Button disabled={btnDisabled} on:click={wantEvent}>The Whole Event Stats</Button>
</center>
</Card2>
{#if match}
    <Card1>
    <div style="display: flex; flex-wrap: wrap; justify-content: center; padding: 8px;">
        <span style="color: white; text-align: center; font-size: 40px; width: 100%;">Pick One Of These 5 Matches Or Enter Your Own Code Below!</span>
        {#each ['2023njski_f1m1', '2023njrob_f1m1', '2023pahat_f1m1', '2019ncwak_f1m1', '2022cmptx_f1m1'] as code, i}
            <div style="text-align: center; margin: 8px; width: 100%;">
                <Button2
                    on:click={() => {
                        matchCode = code;
                        matchData = getMatchStats();
                    }}>
                    {code}
                </Button2>
            </div>
        {/each}
    </div>
</Card1>
    <Card3>
        <center>
        <span style="color: white; text-align: center; width: 100%; font-size: 40px" >Match Searchbar</span><br>
        <form on:submit|preventDefault={() => (matchData = getMatchStats())}>
                <div class="input-group">
                    <div class="container">
                    <div class="search-container">
                      <input class="input" bind:value={matchCode} type="text" placeholder = "Enter The Match Code">
                    </div>
                    </div>
                <Button disabled={btnDisabled} type="submit">Search</Button>
            </div>
        </form>
        <center>
    </Card3>
    {#await matchData}
        <p>Loading</p>
    {:then {event, key, winner, status, video, red_auto, blue_auto, red_teleop, blue_teleop, blue_endgame, red_endgame, red_fouls, blue_fouls, red_epa_sum, blue_epa_sum, red_1, red_2, red_3, blue_1, blue_2, blue_3 }}
    
            <div style="padding: 10px; display:flex; flex-wrap: wrap;">       
                <div class="relative flex min-h-screen w-full flex-col justify-center bg-gray-50 py-6 sm:py-12">
                    <div class="absolute inset-0 bg-[url(/img/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
                    <div class="relative bg-white px-6 pb-8 pt-10 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:rounded-lg sm:px-10">
                    <div class="mx-auto">

                    
                    <div class="space-y-6 py-9 text-base leading-7 text-gray-600">
                        <header class = "text-4xl"><center>{key}</center></header>
                        <ul class="space-y-4">
                        <li class="flex items-center">
                            <svg class="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="11" />
                            <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
                            </svg>
                            <p class="ml-4">
                            The Event Status Is
                            <code class="text-sm font-bold text-gray-900">{status}</code>
                            </p>
                        </li>
                        <li class="flex items-center">
                            <svg class="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="11" />
                            <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
                            </svg>
                            <p class="ml-4">
                            The Event Winner Is
                            <code class="text-sm font-bold text-gray-900">{winner}</code>
                            </p>
                        </ul>
                        <div>
                            <table>
                                <tr>
                                    <th>Aliance</th>
                                    <th>Auto Score</th>
                                    <th>Teleop Score</th>
                                    <th>Endgame Score</th>
                                    <th>Faults</th>
                                    <th>Epa Score</th>
                                </tr>
                                <tr>
                                    <th style="color:red">Red</th>
                                    <th  style = "background-color: #ff9a98">{red_auto}</th>
                                    <th  style = "background-color: #ff9a98">{red_teleop}</th>
                                    <th  style = "background-color: #ff9a98">{red_endgame}</th>
                                    <th style = "background-color: #ff9a98">{red_fouls}</th>
                                    <th  style = "background-color: #ff9a98">{red_epa_sum}</th>
                                </tr>
                                <tr>
                                    <th style="color:#0073fd">Blue</th>
                                    <th style = "background-color: #ADD8E6">{blue_auto}</th>
                                    <th style = "background-color: #ADD8E6">{blue_teleop}</th>
                                    <th style = "background-color: #ADD8E6">{blue_endgame}</th>
                                    <th style = "background-color: #ADD8E6">{blue_fouls}</th>
                                    <th style = "background-color: #ADD8E6">{blue_epa_sum}</th>
                                </tr>
                            </table>
                        </div>
                    </div>
                     
                    <div class="flex">
                        <div>
                            <iframe
                                width="560"
                                height="315"
                                src="https://www.youtube-nocookie.com/embed/{video}"
                                title="YouTube video player"
                                frameborder="0"
                                allow="autoplay;  picture-in-picture; web-share"
                                allowfullscreen
                            />
                        </div>
                        <div>
                            <table>
                                <tr>
                                    <th>Blue Teams</th>
                                    <th>Red Teams</th>
                                </tr>
                                <tr>
                                    <th style = "background-color: #ADD8E6">{blue_1}</th>
                                    <th style = "background-color: #ff9a98">{red_1}</th>
                                </tr>
                                <tr>
                                    <th style = "background-color: #ADD8E6">{blue_2}</th>
                                    <th  style = "background-color: #ff9a98">{red_2}</th>
                                </tr>
                                <tr>
                                    <th style = "background-color: #ADD8E6">{blue_3}</th>
                                    <th style = "background-color: #ff9a98">{red_3}</th>
                                </tr>
                            </table>
                    </div>
                </div>
                    </div>
                </div>
            </div>
            
                </div>
        {:catch error}
        <p>Error: {error}</p>
        {/await}
    {/if}


    {#if event}
        <Card1>
            <div style="display: flex; flex-wrap: wrap; justify-content: center; padding: 8px;">
                <span style="color: white; text-align: center; font-size: 40px; width: 100%;">Pick One Of These 5 Events Or Enter Your Own Code Below!</span>
                {#each ['2023njski', '2023njrob', '2023pahat', '2019ncwak', '2022cmptx'] as code, i}
                    <div style="text-align: center; margin: 8px; width: 50%;">
                        <Button2 style = " width: 300px; height: 50px;"
                            on:click={() => {
                                eventCode = code;
                                eventData = getEventStats();
                            }}>
                            {code}
                        </Button2>
                    </div>
                {/each}
            </div>
        </Card1>

        <Card3>
        <center>
        <span style="color: white; text-align: center; width: 100%; font-size: 40px" >Event Searchbar</span><br>
        <form on:submit|preventDefault={() => (eventData = getEventStats())}>
            <div class="input-group">
                <div class="container">
                <div class="search-container">
                  <input class="input" bind:value={eventCode} type="text" placeholder = "Enter The Event Code">
                </div>
                </div>
                <Button disabled={btnDisabled} type="submit">Search</Button>
            </div>
        </form>
        </center>
        </Card3>
        {#await eventData}
            <p>Loading</p>
        {:then matches}
            <div style="padding: 10px">
                {#each matches as {event, key, winner, status, video, red_auto, blue_auto, red_teleop, blue_teleop, blue_endgame, red_endgame, red_fouls, blue_fouls, red_epa_sum, blue_epa_sum, red_1, red_2, red_3, blue_1, blue_2, blue_3 }}
                

                       
                <div style="padding: 10px; display:flex; flex-wrap: wrap;">
                    <div class="relative flex min-h-screen w-full flex-col justify-center bg-gray-50 py-6 sm:py-12">
                      <div class="absolute inset-0 bg-[url(/img/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
                      <div class="relative bg-white px-6 pb-8 pt-10 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:rounded-lg sm:px-10">
                        <div class="mx-auto">
                            <div class="space-y-6 py-9 text-base leading-7 text-gray-600">
                                <header class = "text-4xl"><center>{key}</center></header>
                                <ul class="space-y-4">
                                <li class="flex items-center">
                                    <svg class="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="12" cy="12" r="11" />
                                    <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
                                    </svg>
                                    <p class="ml-4">
                                    The Event Status Is
                                    <code class="text-sm font-bold text-gray-900">{status}</code>
                                    </p>
                                </li>
                                <li class="flex items-center">
                                    <svg class="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="12" cy="12" r="11" />
                                    <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
                                    </svg>
                                    <p class="ml-4">
                                    The Event Winner Is
                                    <code class="text-sm font-bold text-gray-900">{winner}</code>
                                    </p>
                                </ul>
                                <div>
                                    <table>
                                        <tr>
                                            <th>Aliance</th>
                                            <th>Auto Score</th>
                                            <th>Teleop Score</th>
                                            <th>Endgame Score</th>
                                            <th>Faults</th>
                                            <th>Epa Score</th>
                                        </tr>
                                        <tr>
                                            <th style="color:red">Red</th>
                                            <th  style = "background-color: #ff9a98">{red_auto}</th>
                                            <th  style = "background-color: #ff9a98">{red_teleop}</th>
                                            <th  style = "background-color: #ff9a98">{red_endgame}</th>
                                            <th style = "background-color: #ff9a98">{red_fouls}</th>
                                            <th  style = "background-color: #ff9a98">{red_epa_sum}</th>
                                        </tr>
                                        <tr>
                                            <th style="color:#0073fd">Blue</th>
                                            <th style = "background-color: #ADD8E6">{blue_auto}</th>
                                            <th style = "background-color: #ADD8E6">{blue_teleop}</th>
                                            <th style = "background-color: #ADD8E6">{blue_endgame}</th>
                                            <th style = "background-color: #ADD8E6">{blue_fouls}</th>
                                            <th style = "background-color: #ADD8E6">{blue_epa_sum}</th>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                             
                        <div class="flex">
                            <div>
                                <iframe
                                    width="560"
                                    height="315"
                                    src="https://www.youtube-nocookie.com/embed/{video}"
                                    title="YouTube video player"
                                    frameborder="0"
                                    allow="autoplay;  picture-in-picture; web-share"
                                    allowfullscreen
                                />
                            </div>
                            <div>
                                <table>
                                    <tr>
                                        <th>Blue Teams</th>
                                        <th>Red Teams</th>
                                    </tr>
                                    <tr>
                                        <th style = "background-color: #ADD8E6">{blue_1}</th>
                                        <th style = "background-color: #ff9a98">{red_1}</th>
                                    </tr>
                                    <tr>
                                        <th style = "background-color: #ADD8E6">{blue_2}</th>
                                        <th  style = "background-color: #ff9a98">{red_2}</th>
                                    </tr>
                                    <tr>
                                        <th style = "background-color: #ADD8E6">{blue_3}</th>
                                        <th style = "background-color: #ff9a98">{red_3}</th>
                                    </tr>
                                </table>
                        </div>
                    </div>
                        </div>
                    </div>
                </div>
                </div>
                
                
                
    
                {/each}
            </div>
        {:catch error}
            <p>Error: {error}</p>
        {/await}
    {/if}



<style>

body {
  margin:0;
}

h1 {
  font-family: 'Lato', sans-serif;
  font-weight:300;
  letter-spacing: 2px;
  font-size:90px;
}
p {
  font-family: 'Lato', sans-serif;
  letter-spacing: 1px;
  font-size:14px;
  color: #333333;
}

.header {
  position:relative;
  text-align:center;
  background: linear-gradient(60deg, rgba(84,58,183,1) 0%, rgba(0,172,193,1) 100%);
  color:white;
  font-size: 90px;
}
.logo {
  width:50px;
  fill:white;
  padding-right:15px;
  display:inline-block;
  vertical-align: middle;
}

.inner-header {
  height:65vh;
  width:100%;
  font-size: 90px;
  margin: 0;
  padding: 0;
}

.flex { /*Flexbox for containers*/
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.waves {
  position:relative;
  width: 100%;
  height:15vh;
  margin-bottom:-7px; /*Fix for safari gap*/
  min-height:100px;
  max-height:150px;
}

.content {
  position:relative;
  height:20vh;
  text-align:center;
  background-color: white;
}

/* Animation */

.parallax > use {
  animation: move-forever 25s cubic-bezier(.55,.5,.45,.5)     infinite;
}
.parallax > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}
.parallax > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}
.parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}
.parallax > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}
@keyframes move-forever {
  0% {
   transform: translate3d(-90px,0,0);
  }
  100% { 
    transform: translate3d(85px,0,0);
  }
}
/*Shrinking for mobile*/
@media (max-width: 768px) {
  .waves {
    height:40px;
    min-height:40px;
  }
  .content {
    height:30vh;
  }
  h1 {
    font-size:24px;
  }
}


    div {
        font-family: arial, sans-serif;
        font-size: 20px;
        font-weight: 600;
        border-collapse: collapse;
        text-align: center;
        width: 100%;
    }


    table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
    }


    th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
    }


    .input-group {
        display: flex;
        flex-direction: row;
        border: 1px solid #ccc;
        padding: 8px 10px;
        border-radius: 8px;
        margin-top: 15px;
    }

    .container {
  position: relative;
  background: linear-gradient(135deg, rgb(179, 208, 253) 0%, rgb(164, 202, 248) 100%);
  border-radius: 1000px;
  padding: 10px;
  display: grid;
  place-content: center;
  z-index: 0;
  max-width: 300px;
  margin: 0 10px;
}

.search-container {
  position: relative;
  width: 100%;
  border-radius: 50px;
  background: linear-gradient(135deg, rgb(218, 232, 247) 0%, rgb(214, 229, 247) 100%);
  padding: 5px;
  display: flex;
  align-items: center;
}

.search-container::after, .search-container::before {
  content: "";
  width: 100%;
  height: 100%;
  border-radius: inherit;
  position: absolute;
}

.search-container::before {
  top: -1px;
  left: -1px;
  background: linear-gradient(0deg, rgb(218, 232, 247) 0%, rgb(255, 255, 255) 100%);
  z-index: -1;
}

.search-container::after {
  bottom: -1px;
  right: -1px;
  background: linear-gradient(0deg, rgb(163, 206, 255) 0%, rgb(211, 232, 255) 100%);
  box-shadow: rgba(79, 156, 232, 0.7019607843) 3px 3px 5px 0px, rgba(79, 156, 232, 0.7019607843) 5px 5px 20px 0px;
  z-index: -2;
}

.input {
  padding: 10px;
  width: 100%;
  background: linear-gradient(135deg, rgb(218, 232, 247) 0%, rgb(214, 229, 247) 100%);

  font-size: 20px;
  border-radius: 50px;
}

.input:focus {
  outline: none;
  background: linear-gradient(135deg, rgb(239, 247, 255) 0%, rgb(214, 229, 247) 100%);
}

</style>



