<div class="card">
    <div class="card1">
      <div class="card2">
        <slot></slot>
      </div>
    </div>
  </div>
  
  <style>
    .card {
      color: #333;
      border-radius: 15px;
      padding: 40px 50px;
      margin: 20px 0;
      position: relative;
    }
  
    .card1 {
    background-image: linear-gradient(163deg, #0073fd 0%, #3700ff 100%);
    border-radius: 20px;
    transition: all .3s;
    box-shadow: 0px 0px 30px 1px rgba(0, 0, 255, 0.50);
  }
  
  .card2 {
    background-color: #1a1a1a;
    border-radius: 10px;
    height: 400px;
    transition: all .2s;
  }
  
  .card2:hover {
    transform: scale(0.98);
    border-radius: 20px;
  }
  
  .card1:hover {
    box-shadow: 0px 0px 30px 1px rgba(0, 0, 255, 10);
  }
  
  </style>