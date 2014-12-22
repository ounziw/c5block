<?php
/**
 * C5block - A Theme for Novius OS which allows to create concrete5 block template files.
 *
 * @copyright  2014 Fumito MIZUNO
 * @license    GNU Affero General Public License v3 or (at your option) any later version
 *             http://www.gnu.org/licenses/agpl-3.0.html
 * @link http://www.rescuework.jp
 */?><!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
    <!-- scriptタグ内にXSLTを記述 srcでパスを指定した外部化も可  -->
    <script type="text/xml" id="controllerxsl" src="static/apps/c5block/xsl/controller.xsl"></script>
    <script type="text/xml" id="viewxsl" src="static/apps/c5block/xsl/view.xsl"></script>
    <script type="text/xml" id="editxsl" src="static/apps/c5block/xsl/edit.xsl"></script>
</head>
<body>
<?php echo $wysiwyg['content'] // Novius OS 管理画面で入力したテキストを出力 ?>
<textarea id="xml" rows="30" cols="100">
&lt;?xml version="1.0"?&gt;
    &lt;schema version="0.3"&gt;
    &lt;table name="btSample"&gt;
    &lt;field name="bID" type="I"&gt;
    &lt;key/&gt;
    &lt;unsigned/&gt;
    &lt;/field&gt;
    &lt;field name="text1" type="C" size="50"/&gt;
    &lt;field name="number1" type="I"/&gt;
    &lt;field name="description" type="X2"/&gt;
    &lt;/table&gt;
    &lt;/schema&gt;
</textarea>
<div id="controllerhtml"></div>
<div id="viewhtml"></div>
<div id="edithtml"></div>

<?php echo $wysiwyg['content2'] // Novius OS 管理画面で入力したテキストを出力 ?>

</body>
</html>