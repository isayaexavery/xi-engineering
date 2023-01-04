const createNav = () => {
  let nav = document.querySelector(".main_menu");
  nav.innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-light">
					<div class="container">
						<!-- Brand and toggle get grouped for better mobile display -->
						<a class="navbar-brand logo_h" href="/"><img src="img/logo.png" alt=""></a>
						<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
						</button>
						<!-- Collect the nav links, forms, and other content for toggling -->
						<div class="collapse navbar-collapse offset" id="navbarSupportedContent">
							<ul class="nav navbar-nav menu_nav ml-auto">
								<li class="nav-item "><a class="nav-link" href="/">Home</a></li>
								<li class="nav-item"><a class="nav-link" href="about-us">About</a></li>

								<li class="nav-item"><a class="nav-link" href="services">Services</a>
								<li class="nav-item"><a class="nav-link" href="contact">Contact</a></li>
							</ul>

						</div>
					</div>
            	</nav>
    `;

  let footer = document.querySelector(".footer-area");
  footer.innerHTML = `
    <div class="container">
    <div class="row">
        <div class="col-lg-3  col-md-6 col-sm-6">
            <div class="single-footer-widget ab_wd">
                <h6 class="footer_title">About Us</h6>
                <p>We are a full service electrical and energy company offering a range of turnkey and specialist electrical contracting work.</p>
            </div>
        </div>
        <div class="col-lg-3 col-md-6 col-sm-6">
            <div class="single-footer-widget contact_wd">
                <h6 class="footer_title">Contact Us</h6>
                <p>Mbezi, Dar es Salaam, Tanzania</p>
                <a href="tel:+255717687787">+255 (0) 717-687-787</a>
                
                <a href="to:info@xiengineeringltd.com" >info@xiengineeringltd.com</a>
            </div>
        </div>
    </div>
    <div class="row footer-bottom d-flex justify-content-between align-items-center">
        <p class="col-lg-8 col-md-8 footer-text m-0">
Copyright &copy;<script>document.write(new Date().getFullYear());</script> 2023 <a href="https://colorlib.com" target="_blank"></a>
</p>
        <div class="col-lg-4 col-md-4 footer-social">
            <a href="https://www.linkedin.com/company/xi-engineering-limited/mycompany/?viewAsMember=true"><i class="fa fa-linkedin"></i></a>
        </div>
    </div>
</div>
    `;
};

createNav();
