package com.web.rest;

import com.mservice.config.Environment;
import com.mservice.models.PaymentResponse;
import com.mservice.models.QueryStatusTransactionResponse;
import com.mservice.processor.CreateOrderMoMo;
import com.mservice.processor.QueryTransactionStatus;
import com.mservice.shared.constants.LogUtils;
import com.mservice.shared.constants.RequestType;
import com.web.dto.PaymentDto;
import com.web.dto.ResponsePayment;
import com.web.entity.HistoryPay;
import com.web.entity.User;
import com.web.repository.HistoryPayRepository;
import com.web.repository.UserRepository;
import com.web.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.sql.Time;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class  PaymentController {

    @Autowired
    private HistoryPayRepository historyPayRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/all/urlpayment")
    public ResponsePayment getUrlPayment(@RequestBody PaymentDto paymentDto){
        LogUtils.init();
        String orderId = String.valueOf(System.currentTimeMillis());
        String requestId = String.valueOf(System.currentTimeMillis());
        Environment environment = Environment.selectEnv("dev");
        PaymentResponse captureATMMoMoResponse = null;
        try {
            captureATMMoMoResponse = CreateOrderMoMo.process(environment, orderId, requestId, Long.toString(paymentDto.getAmount()), paymentDto.getContent(), paymentDto.getReturnUrl(), paymentDto.getNotifyUrl(), "", RequestType.PAY_WITH_ATM, null);
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println("url ====: "+captureATMMoMoResponse.getPayUrl());
        ResponsePayment responsePayment = new ResponsePayment(captureATMMoMoResponse.getPayUrl(),orderId,requestId);
        return responsePayment;
    }


    @GetMapping("/all/checkPayment")
    public Integer checkPayment(@RequestParam("orderId") String orderId,
                                @RequestParam("requestId") String requestId,
                                @RequestParam("amount") Double amount) throws Exception {
        Environment environment = Environment.selectEnv("dev");
        QueryStatusTransactionResponse queryStatusTransactionResponse = QueryTransactionStatus.process(environment, orderId, requestId);
        System.out.println("qqqq-----------------------------------------------------------"+queryStatusTransactionResponse.getMessage());
        if(queryStatusTransactionResponse.getResultCode() == 0){
            if(historyPayRepository.findByOrderIdAndRequestId(orderId, requestId).isPresent()){
                return 2;
            }
            User user = userService.getUserWithAuthority();
            user.setAmount(user.getAmount() + amount);
            userRepository.save(user);
            HistoryPay historyPay = new HistoryPay();
            historyPay.setCreatedDate(new Date(System.currentTimeMillis()));
            historyPay.setCreatedTime(new Time(System.currentTimeMillis()));
            historyPay.setOrderId(orderId);
            historyPay.setRequestId(requestId);
            historyPay.setUser(user);
            historyPay.setTotalAmount(amount);
            historyPayRepository.save(historyPay);
            return 0;
        }
        return 1;
    }
}

