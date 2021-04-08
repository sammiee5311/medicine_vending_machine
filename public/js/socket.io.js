function goStream() {
    var socket = io.connect();

    // init name & userId ( needs to be changed to pharmacist Info when they connect webpage )
    socket.emit("login", {
      name: 'Pharmacist',
      userId: "awegijh23uiga98agbjk"
    });

    $("form").submit(function(e) {
      e.preventDefault();
      var $msgForm = $("#msgForm");

      // socket.emit("chat", { msg: $msgForm.val() });
      $msgForm.val("");
    }
    );
};

goStream();