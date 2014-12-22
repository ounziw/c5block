/**
 * SimpleJSXslt
 * Copyright (c) 2013,Yosikazu Saito
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 */
//名前空間宣言（被らなそうな物を適当に宣言）
var shimohi;
if(!shimohi)
    shimohi  = {};
if(!shimohi.xsl)
    shimohi.xsl = {};

//定数定義
shimohi.xsl.MSXML_DOCUMENT = 'MSXML.DomDocument';
shimohi.xsl.MSXML_XML_REQUEST = 'Msxml2.XMLHTTP.3.0';
shimohi.xsl.APPLICATION_XML = 'application/xml';
shimohi.xsl.GET='GET';
shimohi.xsl.DATA='data:';
shimohi.xsl.CHAR_SET=';charset=utf-8,';
shimohi.xsl.UNDEFINED='undefined';

(function($) {

    function getXMLHttpRequest(){
        if (window.ActiveXObject){
            return new ActiveXObject(shimohi.xsl.MSXML_XML_REQUEST);
        }
        return new XMLHttpRequest();
    }
    /**
     * URLからXMLDomドキュメントを生成する。
     * @param xmlURL
     * @return DOMドキュメント
     */
    function loadXMLFromURL(xmlURL)
    {
        var xhttp = getXMLHttpRequest();
        xhttp.open(shimohi.xsl.GET,xmlURL,false);
        xhttp.send('');
        return xhttp.responseXML;
    }
    /**
     * 文字列からXMLDomドキュメントを生成する。
     * @param xmlString
     * @param contentType
     * @return DOMドキュメント
     */
    function loadXMLFromString(xmlString,contentType){

        //IEの場合
        if (typeof ActiveXObject != shimohi.xsl.UNDEFINED) {
            var d = new ActiveXObject(shimohi.xsl.MSXML_DOCUMENT);
            d.loadXML(xmlString);
            return d;
        }

        //DOMParserが定義されている場合
        if(typeof DOMParser != shimohi.xsl.UNDEFINED){
            return new DOMParser().parseFromString(xmlString,contentType);
        }

        if (typeof XMLHttpRequest == shimohi.xsl.UNDEFINED){
            return null;
        }
        var req = new XMLHttpRequest;
        req.open(
            shimohi.xsl.GET,
            shimohi.xsl.DATA + (contentType || shimohi.xsl.APPLICATION_XML),
            shimohi.xsl.CHAR_SET + encodeURIComponent(xmlString),
            false
        );
        if (req.overrideMimeType) {
            req.overrideMimeType(contentType);
        }
        req.send(null);
        return req.responseXML;
    }
    /**
     * 指定されたオブジェクトがDOMNodeかどうかを判定する。
     * @param node
     * @return 判定結果
     */
    function isDomNode(node){
        if(node && typeof(node.nodeType) == 'number'){
            return true;
        }
        return false;
    }
    /**
     * XMLDomドキュメントを生成する。
     * @param xmlInfo 文書のURLまたは文書文字列
     * @return DOMドキュメント
     */
    function loadXML(xmlInfo){
        //scriptタグの解析
        var parsedXml = parseScriptElement(xmlInfo);
        //既にDomオブジェクトである場合
        if(isDomNode(parsedXml)){
            return parsedXml;
        }
        //テキストで直接xmlが記述されている場合
        if(parsedXml.lastIndexOf('<', 0) === 0){
            return loadXMLFromString(parsedXml,'text/xml');
        }
        //外部からロードを行う場合
        return loadXMLFromURL(parsedXml);
    }
    /**
     * Scriptタグの解析
     * @param scriptElement
     */
    function parseScriptElement(scriptElement){
        //scriptタグ以外
        if(scriptElement.tagName==null || scriptElement.tagName.toLowerCase()!='script'){
            return scriptElement;
        }
        //type属性がxmlではない
        if(scriptElement.type==null || scriptElement.type.indexOf('xml') <= -1){
            return scriptElement;
        }
        //src属性が存在する場合
        if(scriptElement.src!=null && scriptElement.src.length > 0){
            return scriptElement.src;
        }
        //sprictタグ内に直接記述されている場合
        var result = scriptElement.innerHTML;
        if(result == null || result.length==0){
            return "";
        }
        return result.replace(/(^\s+)|(\s+$)/g,'');
    }
    /**
     * xmlSourceで指定したXML文書をXSLT変換し、HTMLのDOMオブジェクトを返す。
     * @param xmlSource xml文書(Domオブジェクト or XML文字列 or URL or scriptタグ)
     * @param xsltSource xslt文書(Domオブジェクト or XML文字列 or URL or scriptタグ)
     */
    function transform(xmlSource,xslSource){

        //DOM生成
        var xml = loadXML(xmlSource);
        var xsl = loadXML(xslSource);

        //IEの場合
        if(typeof XSLTProcessor == shimohi.xsl.UNDEFINED){
            return transformForIE(xml,xsl);
        }
        xsltProcessor=new XSLTProcessor();
        xsltProcessor.importStylesheet(xsl);
        return  xsltProcessor.transformToFragment(xml,document);
    }

    /**
     * IE向けの対応
     */
    function transformForIE(xml,xsl){
        try{
            // IE6, IE7, IE8
            if (typeof (xml.transformNode) != "undefined") {
                return createTransformedNode(xml.transformNode(xsl));
            }

            var xslt = new ActiveXObject("Msxml2.XSLTemplate");
            var xslDoc = new ActiveXObject("Msxml2.FreeThreadedDOMDocument");
            var xslStr = xsl.xml;

            //IE11向けの対応
            if(xslStr == null){
                var xs = new XMLSerializer();
                xslStr = xs.serializeToString(xsl);
            }
            xslDoc.loadXML(xslStr);
            xslt.stylesheet = xslDoc;
            var xslProc = xslt.createProcessor();
            xslProc.input = xml;
            xslProc.transform();

            return createTransformedNode(xslProc.output);
        }
        catch(e){
        }
    }

    /**
     * XMLの文字列からDOMノードを生成して返す。
     */
    function createTransformedNode(xmlStr){
        var div = document.createElement('div');
        document.body.appendChild(div);
        div.innerHTML=xmlStr;
        return document.body.removeChild(div);
    }

    var ns=shimohi.xsl;
    ns.loadXML=loadXML;
    ns.transform = transform;
})();
//↑ここまでが単独で動作するコード
//↓以下はJQueryの拡張
$.fn.extend({
    transform: function(xslt){
        var result = [];
        this.each(function(){
            result.push(shimohi.xsl.transform(this,xslt));
        });
        return $(result);
    },
    xslt: function(xml){
        var result = [];
        this.each(function(){
            result.push(shimohi.xsl.transform(xml,this));
        });
        return $(result);
    }
});