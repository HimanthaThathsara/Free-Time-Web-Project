class PreLoader extends HTMLElement {
    constructor() {
        super(); // Call the parent constructor
        this.attachShadow({ mode: 'open' }); // Attach a shadow DOM
        this.shadowRoot.innerHTML = `
        <style>
          .disable-ajaxload .preloader-wrap {
		display:none;
	}

	.preloader-wrap {
		width: 100%;
		height:100%;
		position: fixed;
		top: 0;
		bottom: 0;
		background: #000;
		z-index : 1800;
		text-align:center;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction:column;
	}

	.preloader-wrap .outer {
		padding: 0px;
		box-sizing:border-box;
	}

	.preloader-wrap .inner {
		vertical-align:middle;
		box-sizing:border-box;
	}

	.percentage-wrapper {
		position:relative;
		display:block;
		text-align:center;
		width:100%;
		height: auto;
		z-index:10;
		box-sizing:border-box;
		padding:60px 0;
		overflow:hidden;
		mask-image: linear-gradient(180deg, transparent 5%, #000 15%, #000 85%, transparent 95%);
  		-webkit-mask-image: linear-gradient(180deg, transparent 5%, #000 15%, #000 85%, transparent 95%);
	}

	.percentage {
		font-size: calc(1rem + 12vw);
  		line-height: calc(1rem + 11vw);
		font-weight: 600;
		width:auto;
		height: calc(1rem + 11vw);
		color:#fff;
		display: flex;
		justify-content: center;
		overflow:hidden;
	}

	.percentage .number {
		display:block;
		text-align:center;
	}

	.percentage .number:first-child {
		display:block;
		text-align:right;
	}

	.percentage .number span {
		display:block;
	}

	.percentage-first {
		height: calc(1rem + 1.6vw);
		font-size: calc(1rem + 1vw);
		line-height: calc(1rem + 1.6vw);
		font-weight: 600;
		color:rgba(255,255,255,1);
		margin-top:10px;
		overflow:hidden;
	}

	.percentage-first span {
		position:relative;
		display:block;
		transform: translateY(100%);
		-webkit-transform: translateY(100%);
	}

	.percentage-last {
		position:absolute;
		width:100%;
		height: 100%;
		font-size: calc(1rem + 4vw);
		line-height: inherit;
		font-weight: 600;
		color:rgba(255,255,255,1);
		text-align:center;
		margin-top:10px;
		overflow:hidden;
		top:0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.percentage-last span {
		position:relative;
		display:block;
		transform: translateY(200%);
		-webkit-transform: translateY(200%);
		opacity: 0;
	}

	.trackbar {
		width: 100%;
		height: auto;
		margin: 0 auto;
		display: flex;
		position: relative;
		padding: 0 80px;
		box-sizing:border-box;
		opacity: 1;
	}

	.loadbar {
		width: 300px;
		height: 50px;
		left: 0;
		right:0;
		margin: 0 auto;
		overflow: hidden;
		z-index:0;
		transform-origin:  center center;
		display: flex;
		justify-content: space-between;
	}

	.loadbar-inner {
		width: 100%;
		height: 100%;
		background: #000;
		position: absolute;
		top: 0px;
		left: auto;
		right: auto;
		overflow: hidden;
		z-index:20;
		clip-path: circle(0%);
	}

	.hold-progress-bar {
		width: 0%;
		height: 0px;
		background: rgba(0,0,0,1);
		position: absolute;
		top: 0px;
		left: 0;
		right:0;
		overflow: hidden;
	}

	.preloader-intro {
		position:relative;
		display:block;
		color:#fff;
		overflow:hidden;
		float:left;
		z-index:10;
		opacity:1;
		mix-blend-mode: difference;
	}

	.preloader-intro span {
		position: relative;
		display:block;
		font-weight:500;
		position: relative;
		font-size: 30px;
		line-height: 50px;
	}
        </style>
        <div class="preloader-wrap" data-centerLine="Loading">

            <div class="percentage-wrapper">
            	<div class="percentage" id="precent">

                    <span class="number number_2">
                        <span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>0</span>
                    </span>
                    <span class="number number_3">
                        <span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>0</span>
                    </span>
            	</div>
                <div class="percentage-first"><span>wait, wait..</span></div>
                <div class="percentage-last"><span>100</span></div>
            </div>

        </div>
        
      `;
    }
}

// Register the custom element
customElements.define('pre-loader', PreLoader);