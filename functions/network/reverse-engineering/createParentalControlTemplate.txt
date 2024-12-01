await fetch(
  "http://192.168.1.254/html/bbsp/parentalctrl/add.cgi?x_SAVE_A=InternetGatewayDevice.X_HW_Security.ParentalCtrl.Templates&RequestFile=html/bbsp/parentalctrl/parentalctrltime.asp",
  {
    credentials: "include",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.5",
      "Content-Type": "application/x-www-form-urlencoded",
      "Upgrade-Insecure-Requests": "1",
      Priority: "u=4",
    },
    referrer:
      "http://192.168.1.254/html/bbsp/parentalctrl/parentalctrltemplate.asp",
    body: "x_SAVE_A.Name=Hello+This+Is+A+Test&x_SAVE_A.StartDate=&x_SAVE_A.EndDate=&x.X_HW_Token=fb3f1a9e73077dac4ffd821c6a1efae26119ff5c865df8a8",
    method: "POST",
    mode: "cors",
  }
);

/* {
	"x_SAVE_A.Name": "Hello+This+Is+A+Test",
	"x_SAVE_A.StartDate": "",
	"x_SAVE_A.EndDate": "",
	"x.X_HW_Token": "fb3f1a9e73077dac4ffd821c6a1efae26119ff5c865df8a8"
} */