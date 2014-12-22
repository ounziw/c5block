<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/schema/table">
        <h2>edit.php</h2>
        <textarea rows="30" cols="100">&lt;?php defined('C5_EXECUTE') or die("Access Denied."); ?&gt;
        <xsl:for-each select="field"><xsl:if test="@name!='bID'">
            <xsl:choose>
                <xsl:when test="(@type='I') or (@type='I1') or (@type='I2') or (@type='I4') or (@type='I8')">
    &lt;?php echo $form->number('<xsl:value-of select="@name" />', $controller-><xsl:value-of select="@name" />);?&gt;
                </xsl:when>
                <xsl:when test="(@type='X') or (@type='X2') or (@type='XL')">
    &lt;?php echo $form->textarea('<xsl:value-of select="@name" />', $controller-><xsl:value-of select="@name" />);?&gt;
                </xsl:when>
                <xsl:otherwise>
    &lt;?php echo $form->text('<xsl:value-of select="@name" />', $controller-><xsl:value-of select="@name" />);?&gt;
                </xsl:otherwise>
            </xsl:choose>
            </xsl:if></xsl:for-each>
        </textarea>
    </xsl:template>
</xsl:stylesheet>