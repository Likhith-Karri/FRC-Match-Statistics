<script>
    export let style = 'primary'
    export let type = 'button'
    export let disabled = false
  </script>
  
  <button {type} {disabled} class = "cursor-pointer transition-all 
  bg-red-700 text-white px-6 py-2 rounded-lg
  border-blue-700
  border-b-[4px] hover:brightness-110 hover:-translate-y-[5px] hover:border-b-[6px]
  active:border-b-[2px] active:brightness-90 active:translate-y-[2px] hover:shadow-xl hover:shadow-blue-700 shadow-blue-700 active:shadow-none" on:click>
    <slot></slot>
  </button>
  
  
  <style>
    button {
      color: #fff;
      border: 0;
      border-radius: 8px;
      color: #fff;
      width: 300px;
      height: 50px;
      cursor: pointer;
      font-size: 30px;
      font-weight: 600;
    }
  
    button:hover {
      transform: scale(0.98);
      opacity: 0.9;
    }
  
    button:disabled{
      background-color: #cccccc;
      color: #333;
      cursor:auto;
    }
  
    button:disabled:hover{
      transform:scale(1);
      opacity: 1;
    }
  
  </style>