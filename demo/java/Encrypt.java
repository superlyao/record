package com.yliao.house;

import com.yliao.house.encrypt.RSAUtil;
import org.junit.Test;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.security.PrivateKey;
import java.security.PublicKey;

/**
 * @Author:zhao-baolin
 * @Description:
 * @Date:Created in 2018/7/4
 * @Modified By:
 */
public class Encrypt {

    @Test
    public void encrypt() throws Exception {
        String source = "今天天气真好";

//        //公钥加密
//        PublicKey publicKey = RSAUtil.getPublicKey("MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC8CqTMefTr2pcqeXrn5KgqOLXo\n" +
//                "0+uoG3GQIdilllMfogWHHLkMUBTOh2PoAkjhNClTO95C1uVqi/8U+DhR+kfmX90X\n" +
//                "bMCMkk3Q/NGyrXd2jhqoGixT+drVymdijsZ9ZDYrNvGahSdF/oeAfvZBE4jKubdO\n" +
//                "7XMMvAsASp/FRvOVrQIDAQAB");
//        String encript = RSAUtil.encryptString(publicKey, source);
//        System.out.println("加密后数据：" + encript);

        //私钥解密
        PrivateKey privateKey = RSAUtil.getPrivateKey("MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAMHP52NQWAtsXxgn\n" +
                "NxoIsM1xLs4rqSu5WqaxjgR1929eeFrxDTvioU9XNMEVTZVnMAuI+v7OFYe4taSM\n" +
                "mQTKKDO7lf20O5y6oug+2m2cMwqevnjLHCuAD+nKvb9uymRFadzWSE3VtzAgS4ba\n" +
                "j48it5Y19F3u84iDYN4UrHPhHSqbAgMBAAECgYBytR35xZ+Wgzl1DiCqo+IgdZCC\n" +
                "LY0ed8GTTxsCwN8FZyBMksaGXweh8bcjX/xfJIdnDFehX0+W2FeJYD1gfFV14Fb0\n" +
                "8Qug5lw231K7hvNo4QjXCVRvIQILYRcHBoJSoG6MasjH/t7kGwMVUZm6a730n3wa\n" +
                "kf4kpyw0Bn9Pi2ck4QJBAPFlCWE8vd8F1g3iF/5VlmQRS/+FJmA+IHsoGi6r7g8N\n" +
                "VfNkvZz6IagFuNxHAES8HGF48evN8wCZaFo4asMq638CQQDNidxhJGX8ZRhYdChb\n" +
                "KNOwOVToqOPFjOgLzNIRQA+1rjPgSzetuVCChW0gotG6eNH/CLNiQtFTCt05fnn8\n" +
                "MH7lAkEAoo2LN3OT2G8xqb+qsJYp49DSAItFQGIVtVlX6D3W3UP5sSERnnfB2keg\n" +
                "KJWXVLHn2qt7HXNeQ/UKFFcRbcOlOQJAOn5gbHjqWVEAA7RTA9ZzoDRAuNHPuJno\n" +
                "M+t/YQ9lKSRBeTSOzO7vPaXxL5eGrlXSFY2JV46CeeqemM0otB+tDQJBAOVgoaSq\n" +
                "NHHncribMKmcXCxMT2xwC5wUosHQlBbKLKwMHr9LhTXihHxy6cWjzaxkqiarj7TY\n" +
                "qHHHuuOIxJCSW6U=");
        String oldSource = RSAUtil.decryptString(privateKey, "Ow2OM/IJ3ofh19N+MBdk6weJPtK+HcNzh1ifBqT4NXt04nqWKCfLV+tB4JxMAyzi6RlWNfSwpv5QO38a/j45SLSFaafTqo93BZqUYHETocvkqhWRaloPU3avp6YXI0bV7olZBEqew9dimaUbiFGAkyovlz/alJiygWCrT5HL/gk=");
        System.out.println("解密后数据:" + oldSource);
    }

}
