library Functions {
    enum Location { Inline, Remote }
    enum CodeLanguage { JavaScript, Solidity }

    struct Request {
        string code;
        Location location;
        CodeLanguage language;
    }

    function initializeRequest(
        Request memory self,
        Location location,
        CodeLanguage language,
        string memory code
    ) internal pure {
        self.location = location;
        self.language = language;
        self.code = code;
    }
}
