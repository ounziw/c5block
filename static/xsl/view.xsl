<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/schema/table">
        <h2>view.php</h2>
        <textarea rows="30" cols="100">&lt;?php defined('C5_EXECUTE') or die("Access Denied."); ?&gt;
        <xsl:for-each select="field"><xsl:if test="@name!='bID'">
            &lt;?php if ($<xsl:value-of select="@name" />) :?&gt;
            &lt;?php echo h($<xsl:value-of select="@name" />) ;?&gt;
            &lt;?php endif;?&gt;
        </xsl:if></xsl:for-each>
        </textarea>
    </xsl:template>
</xsl:stylesheet>