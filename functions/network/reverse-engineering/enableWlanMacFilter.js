await fetch(
  "http://192.168.1.254/html/bbsp/wlanmacfilter/set.cgi?x=InternetGatewayDevice.X_HW_Security&RequestFile=html/bbsp/wlanmacfilter/wlanmacfilter.asp",
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
      "http://192.168.1.254/html/bbsp/wlanmacfilter/add.cgi?x=InternetGatewayDevice.X_HW_Security.WLANMacFilter&RequestFile=html/bbsp/wlanmacfilter/wlanmacfilter.asp",
    body: "x.WlanMacFilterPolicy=0&x.WlanMacFilterRight=1&x.X_HW_Token=7e4ec534baa98fac885b5691fa5ef5865314e29163c0c7f4",
    method: "POST",
    mode: "cors",
  }
);


/* {
	"x.WlanMacFilterPolicy": "0",
	"x.WlanMacFilterRight": "1",
	"x.X_HW_Token": "7e4ec534baa98fac885b5691fa5ef5865314e29163c0c7f4"
} */